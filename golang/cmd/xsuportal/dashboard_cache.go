package main

import (
	"context"
	"net/http"
	"sync"
	"time"

	audiencepb "github.com/isucon/isucon10-final/webapp/golang/proto/xsuportal/services/audience"
	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
	"google.golang.org/protobuf/proto"
)

type DashboardData = []byte

type DashboardCache struct {
	Dashboard DashboardData
	Mutex     sync.RWMutex
}

var dashboardCache DashboardCache

func InitDashboardCache() {
	dashboardCache = DashboardCache{}
}

// キャッシュから取ってくる
func (d *DashboardCache) Get(e echo.Context) (DashboardData, error) {
	return d.Dashboard, nil
}

// キャッシュの元となるデータを取ってくる
func GetFromDB(e echo.Context) (DashboardData, error) {
	// audienceの場合はteamID 0で固定
	dashboardFromDB, err := makeLeaderboardPB(e, 0)
	if err != nil {
		return nil, err
	}
	dashboardReponse := &audiencepb.DashboardResponse{
		Leaderboard: dashboardFromDB,
	}
	return proto.Marshal(dashboardReponse)
}

func (d *DashboardCache) DashboardUpdater() {
	t := time.NewTicker(100 * time.Millisecond)
	for {
		select {
		case <-t.C:
			func() {
				start := time.Now()
				log.Info("Update dashboard cache start")
				d.Mutex.Lock()
				defer d.Mutex.Unlock()
				req, err := http.NewRequest("GET", "/dashboard_update", nil)
				if err != nil {
					log.Warn(err)
					return
				}
				req = req.WithContext(context.Background())
				e := echo.New().NewContext(req, nil)
				fromDB, err := GetFromDB(e)
				if err != nil {
					log.Warn(err)
					return
				}
				d.Dashboard = fromDB
				end := time.Now()
				log.Infof("Update dashboard cache finish: duration=%v", end.Sub(start))
			}()
		}
	}
}
