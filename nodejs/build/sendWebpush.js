"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const web_push_1 = __importDefault(require("web-push"));
const sshpk_1 = __importDefault(require("sshpk"));
const urlsafe_base64_1 = __importDefault(require("urlsafe-base64"));
const notification_pb_1 = require("../proto/xsuportal/resources/notification_pb");
const app_1 = require("./app");
const promise_mysql_1 = require("promise-mysql");
const WEBPUSH_SUBJECT = 'xsuportal-debug@example.com';
const dbinfo = {
    host: process.env['MYSQL_HOSTNAME'] ?? '127.0.0.1',
    port: Number.parseInt(process.env['MYSQL_PORT'] ?? '3306'),
    user: process.env['MYSQL_USER'] ?? 'isucon',
    database: process.env['MYSQL_DATABASE'] ?? 'xsuportal',
    password: process.env['MYSQL_PASS'] || 'isucon',
    charset: 'utf8mb4',
    timezone: '+00:00'
};
const getVapidKey = (path) => {
    const pri = sshpk_1.default.parsePrivateKey(fs_1.default.readFileSync(path), "pem");
    const pub = pri.toPublic();
    const privateKey = urlsafe_base64_1.default.encode(pri.part.d.data);
    const publicKey = urlsafe_base64_1.default.encode(pub.part.Q.data);
    return { privateKey, publicKey };
};
const getTestNotificationResource = () => {
    const testMessage = new notification_pb_1.Notification.TestMessage();
    testMessage.setSomething(Math.floor(Math.random() * 10000));
    const notification = new notification_pb_1.Notification();
    notification.setCreatedAt(app_1.convertDateToTimestamp(new Date()));
    notification.setContentTest(testMessage);
    return notification;
};
const insertNotification = async (db, notification, contentId) => {
    const message = Buffer.from(notification.serializeBinary()).toString('base64');
    await db.query("INSERT INTO `notifications` (`contestant_id`, `encoded_message`, `read`, `created_at`, `updated_at`) VALUES (?, ?, FALSE, NOW(6), NOW(6))", [contentId, message]);
    const [inserted] = await db.query('SELECT * FROM `notifications` WHERE `id` = LAST_INSERT_ID()');
    return inserted;
};
const getPushSubscriptions = async (db, contestantId) => {
    const subscriptions = await db.query("SELECT * FROM `push_subscriptions` WHERE `contestant_id` = ?", [contestantId]);
    return subscriptions;
};
const sendWebpush = async (vapidKey, notification, pushSubscription) => {
    const message = Buffer.from(notification.serializeBinary()).toString('base64');
    const requestOpts = {
        vapidDetails: {
            subject: `mailto:${WEBPUSH_SUBJECT}`,
            ...vapidKey
        },
    };
    const subscription = {
        endpoint: pushSubscription.endpoint,
        keys: {
            p256dh: pushSubscription.p256dh,
            auth: pushSubscription.auth
        }
    };
    const result = await web_push_1.default.sendNotification(subscription, message, requestOpts);
    return result;
};
const run = async (path, contestantId) => {
    if (!path || !contestantId)
        throw Error('path and contestantId is required');
    const db = await promise_mysql_1.createConnection(dbinfo);
    try {
        const vapidKey = getVapidKey(path);
        const subscriptions = await getPushSubscriptions(db, contestantId);
        if (subscriptions.length === 0) {
            throw new Error(`no push subscriptions found: contestant_id=${contestantId}`);
        }
        const notificationResource = getTestNotificationResource();
        const notification = await insertNotification(db, notificationResource, contestantId);
        notificationResource.setId(notification.id);
        notificationResource.setCreatedAt(app_1.convertDateToTimestamp(notification.created_at));
        console.log('Notification: ', notificationResource.toObject());
        for (const subscription of subscriptions) {
            console.log("Sending web push: push_subscription", subscription);
            const result = await sendWebpush(vapidKey, notificationResource, subscription);
            console.log({ result });
        }
        console.log('finished');
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await db.end();
    }
};
const [, , contestantId, path] = process.argv;
run(path, contestantId);
