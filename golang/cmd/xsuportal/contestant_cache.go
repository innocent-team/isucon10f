package main

import (
	"database/sql"
	"fmt"
	"sync"

	xsuportal "github.com/isucon/isucon10-final/webapp/golang"
	resourcespb "github.com/isucon/isucon10-final/webapp/golang/proto/xsuportal/resources"
	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"
	"github.com/pkg/errors"
)

type ContestantData = map[string]xsuportal.Contestant
type TeamData = map[int64]xsuportal.Team
type ContestantCache struct {
	Contestants ContestantData
	Teams       TeamData
	Freezed     bool
	Mutex       sync.RWMutex
}

var contestantCache ContestantCache

func InitContestantCache() {
	contestantCache = ContestantCache{}
}

/// コンテストが始まっていれば情報はフリーズできる
func (c *ContestantCache) CanFreeze(e echo.Context) (bool, error) {
	c.Mutex.RLock()
	f := c.Freezed
	c.Mutex.RUnlock()
	if f {
		return false, nil
	}
	status, err := getCurrentContestStatus(e, db)
	if err != nil {
		return false, errors.Wrapf(err, "ContestStatus")
	}
	return status.Status == resourcespb.Contest_STARTED || status.Status == resourcespb.Contest_FINISHED, nil
}

// 情報を確定させる
func (c *ContestantCache) Freeze(e echo.Context) error {
	ctx := e.Request().Context()

	var contestants []xsuportal.Contestant
	if err := sqlx.GetContext(ctx, db, &contestants, "SELECT * FROM `contestants`"); err != nil {
		return fmt.Errorf("query contestant: %w", err)
	}

	var teams []xsuportal.Team
	query := "SELECT * FROM `teams`"
	err := sqlx.GetContext(ctx, db, &teams, query)
	if err != nil {
		return fmt.Errorf("query team: %w", err)
	}

	c.Mutex.Lock()
	for _, cs := range contestants {
		c.Contestants[cs.ID] = cs
	}
	for _, ts := range teams {
		c.Teams[ts.ID] = ts
	}
	c.Freezed = true
	c.Mutex.Unlock()
	return nil
}

// 情報を確定できるか確認する．確定できるなら確定する．キャッシュを使えるなら使う．
func (c *ContestantCache) GetByID(e echo.Context, id string) (*xsuportal.Contestant, error) {
	ok, err := c.CanFreeze(e)
	if err != nil {
		return nil, err
	}
	if ok {
		c.Freeze(e)
	}

	if c.Freezed {
		contestant, ok := c.Contestants[id]
		if !ok {
			return nil, errors.Errorf("Missing user in Freezed", id)
		}
		return &contestant, nil
	}

	var contestant xsuportal.Contestant
	query := "SELECT * FROM `contestants` WHERE `id` = ? LIMIT 1"
	err = sqlx.GetContext(e.Request().Context(), db, &contestant, query, id)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("query contestant: %w", err)
	}
	return &contestant, nil
}
