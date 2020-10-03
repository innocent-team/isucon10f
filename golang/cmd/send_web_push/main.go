package main

import (
	"context"
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/x509"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"encoding/pem"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"os"
	"time"

	"github.com/SherClockHolmes/webpush-go"
	"github.com/golang/protobuf/proto"
	"github.com/jmoiron/sqlx"
	"github.com/newrelic/go-agent/v3/newrelic"
	"google.golang.org/protobuf/types/known/timestamppb"

	xsuportal "github.com/isucon/isucon10-final/webapp/golang"
	"github.com/isucon/isucon10-final/webapp/golang/proto/xsuportal/resources"
)

const (
	WebpushSubject = "xsuportal-debug@example.com"
)

var nrApp *newrelic.Application

func main() {
	log.SetFlags(0)
	log.SetPrefix("send_web_push: ")
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func GetVAPIDKey(path string) (*ecdsa.PrivateKey, error) {
	pemBytes, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read pem: %w", err)
	}
	for {
		block, rest := pem.Decode(pemBytes)
		pemBytes = rest
		if block == nil {
			break
		}
		ecPrivateKey, err := x509.ParseECPrivateKey(block.Bytes)
		if err != nil {
			continue
		}
		return ecPrivateKey, nil
	}
	return nil, fmt.Errorf("not found ec private key")
}

func MakeTestNotificationPB() *resources.Notification {
	return &resources.Notification{
		CreatedAt: timestamppb.New(time.Now().UTC()),
		Content: &resources.Notification_ContentTest{
			ContentTest: &resources.Notification_TestMessage{
				Something: rand.Int63n(10000),
			},
		},
	}
}

func InsertNotification(db sqlx.ExtContext, notificationPB *resources.Notification, contestantID string) (*xsuportal.Notification, error) {
	txn, ctx := startTransaction(context.TODO(), "InsertNotification")
	defer txn.End()
	b, err := proto.Marshal(notificationPB)
	if err != nil {
		return nil, fmt.Errorf("marshal notification: %w", err)
	}
	encodedMessage := base64.StdEncoding.EncodeToString(b)
	res, err := db.ExecContext(ctx,
		"INSERT INTO `notifications` (`contestant_id`, `encoded_message`, `read`, `created_at`, `updated_at`) VALUES (?, ?, FALSE, NOW(6), NOW(6))",
		contestantID,
		encodedMessage,
	)
	if err != nil {
		return nil, fmt.Errorf("insert notification: %w", err)
	}
	id, _ := res.LastInsertId()
	var notification xsuportal.Notification
	err = sqlx.GetContext(ctx,
		db,
		&notification,
		"SELECT * FROM `notifications` WHERE `id` = ?",
		id,
	)
	if err != nil {
		return nil, fmt.Errorf("get notification: %w", err)
	}
	return &notification, nil
}

func startTransaction(ctx context.Context, name string) (txn *newrelic.Transaction, newCtx context.Context) {
	txn = nrApp.StartTransaction(name)
	newCtx = newrelic.NewContext(ctx, txn)
	return
}

func GetPushSubscriptions(db sqlx.QueryerContext, contestantID string) ([]xsuportal.PushSubscription, error) {
	txn, ctx := startTransaction(context.TODO(), "GetPushSubscriptions")
	defer txn.End()
	var subscriptions []xsuportal.PushSubscription
	err := sqlx.SelectContext(ctx,
		db,
		&subscriptions,
		"SELECT * FROM `push_subscriptions` WHERE `contestant_id` = ?",
		contestantID,
	)
	if err != sql.ErrNoRows && err != nil {
		return nil, fmt.Errorf("select push subscriptions: %w", err)
	}
	return subscriptions, nil
}

func SendWebPush(vapidKey *ecdsa.PrivateKey, notificationPB *resources.Notification, pushSubscription *xsuportal.PushSubscription) error {
	b, err := proto.Marshal(notificationPB)
	if err != nil {
		return fmt.Errorf("marshal notification: %w", err)
	}
	message := make([]byte, base64.StdEncoding.EncodedLen(len(b)))
	base64.StdEncoding.Encode(message, b)

	vapidPrivateKey := base64.RawURLEncoding.EncodeToString(vapidKey.D.Bytes())
	vapidPublicKey := base64.RawURLEncoding.EncodeToString(elliptic.Marshal(vapidKey.Curve, vapidKey.X, vapidKey.Y))

	resp, err := webpush.SendNotification(
		message,
		&webpush.Subscription{
			Endpoint: pushSubscription.Endpoint,
			Keys: webpush.Keys{
				Auth:   pushSubscription.Auth,
				P256dh: pushSubscription.P256DH,
			},
		},
		&webpush.Options{
			Subscriber:      WebpushSubject,
			VAPIDPublicKey:  vapidPublicKey,
			VAPIDPrivateKey: vapidPrivateKey,
		},
	)
	if err != nil {
		return fmt.Errorf("send notification: %w", err)
	}
	defer resp.Body.Close()
	expired := resp.StatusCode == 410
	if expired {
		return fmt.Errorf("expired notification")
	}
	invalid := resp.StatusCode == 404
	if invalid {
		return fmt.Errorf("invalid notification")
	}
	return nil
}

func run() error {
	// New Relic
	var err error
	nrLicenseKey := os.Getenv("NEWRELIC_LICENSE_KEY")
	nrApp, err = newrelic.NewApplication(
		newrelic.ConfigAppName("isucon10f-send_web_push"),
		newrelic.ConfigDistributedTracerEnabled(true),
		newrelic.ConfigLicense(nrLicenseKey),
	)
	if err != nil {
		log.Printf("NewRelic app not configured, ignoring: %s", err)
	}
	rand.Seed(time.Now().Unix())
	var flags struct {
		contestantID        string
		vapidPrivateKeyPath string
	}
	flag.StringVar(&flags.contestantID, "c", "", "contestant id (required)")
	flag.StringVar(&flags.vapidPrivateKeyPath, "i", "", "VAPID private key path (required)")
	flag.Parse()

	if flags.contestantID == "" || flags.vapidPrivateKeyPath == "" {
		flag.Usage()
		os.Exit(2)
	}

	vapidKey, err := GetVAPIDKey(flags.vapidPrivateKeyPath)
	if err != nil {
		return fmt.Errorf("get vapid key: %w", err)
	}

	db, err := xsuportal.GetDB()
	if err != nil {
		return fmt.Errorf("get db: %w", err)
	}
	defer db.Close()

	subscriptions, err := GetPushSubscriptions(db, flags.contestantID)
	if err != nil {
		return fmt.Errorf("get push subscrptions: %w", err)
	}
	if len(subscriptions) == 0 {
		return fmt.Errorf("no push subscriptions found: contestant_id=%v", flags.contestantID)
	}

	notificationPB := MakeTestNotificationPB()
	notification, err := InsertNotification(db, notificationPB, flags.contestantID)
	if err != nil {
		return fmt.Errorf("insert notification: %w", err)
	}
	notificationPB.Id = notification.ID
	notificationPB.CreatedAt = timestamppb.New(notification.CreatedAt)

	jsonBytes, err := json.Marshal(notificationPB)
	if err != nil {
		return fmt.Errorf("notification to json: %w", err)
	}
	fmt.Printf("Notification=%v\n", string(jsonBytes))

	for _, subscription := range subscriptions {
		jsonBytes, err := json.Marshal(subscription)
		if err != nil {
			return fmt.Errorf("subscription to json: %w", err)
		}
		fmt.Printf("Sending web push: push_subscription=%v\n", string(jsonBytes))
		err = SendWebPush(vapidKey, notificationPB, &subscription)
		if err != nil {
			return fmt.Errorf("send webpush: %w", err)
		}
	}
	fmt.Println("Finished")
	return nil
}
