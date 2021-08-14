package model

import (
	"time"
)

type User struct {
	UID       string
	Name      string
	Score     int32
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt time.Time
}
