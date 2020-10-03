package main

import (
	"sync"
	"time"

	audiencepb "github.com/isucon/isucon10-final/webapp/golang/proto/xsuportal/services/audience"
	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
	"google.golang.org/protobuf/proto"
)

type DashboardData = []byte

type DashboardCache struct {
	Dashboard      DashboardData
	CacheCreatedAt time.Time
	Mutex          sync.RWMutex
}

var dashboardCache DashboardCache

func InitDashboardCache() {
	dashboardCache = DashboardCache{}
}

// キャッシュが1秒以上古びているかどうか
func (d *DashboardCache) IsExpired(now time.Time) bool {
	// 怖いのでちょっと安全側に 0.8 秒とる
	cacheCreatedAtPlus1sec := d.CacheCreatedAt.Add(800 * time.Millisecond)
	return cacheCreatedAtPlus1sec.Before(now)
}

// キャッシュから取ってくる、キャッシュが失効してたらデータ作りなおしてsetする
func (d *DashboardCache) Get(e echo.Context) (DashboardData, error) {
	now := time.Now()

	d.Mutex.RLock()
	expired := d.IsExpired(now)
	d.Mutex.RUnlock()

	if expired {
		d.Mutex.Lock()
		fromDB, err := GetFromDB(e)
		if err != nil {
			return nil, err
		}
		d.Dashboard = fromDB
		d.CacheCreatedAt = now
		d.Mutex.Unlock()
	}

	d.Mutex.RLock()
	ret := d.Dashboard
	d.Mutex.RUnlock()
	return ret, nil
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
	t := time.NewTicker(500 * time.Millisecond)
	for {
		select {
		case <-t.C:
			func() {
				d.Mutex.Lock()
				defer d.Mutex.Unlock()
				e := echo.New().NewContext(nil, nil)
				fromDB, err := GetFromDB(e)
				if err != nil {
					log.Warn(err)
					return
				}
				d.Dashboard = fromDB
				now := time.Now()
				d.CacheCreatedAt = now
			}()
		}
	}
}
