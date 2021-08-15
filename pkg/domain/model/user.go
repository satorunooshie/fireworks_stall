package model

import (
	"time"
)

type User struct {
	UID       string
	Name      string
	Score     int32
	Level     int32
	CreatedAt time.Time
	UpdatedAt time.Time
}
