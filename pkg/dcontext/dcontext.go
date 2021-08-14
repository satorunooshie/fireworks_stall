package dcontext

import (
	"context"
)

type key string

const (
	uid key = "uid"
)

func SetUID(ctx context.Context, userID string) context.Context {
	return context.WithValue(ctx, uid, userID)
}

//nolint
func GetUIDFromContext(ctx context.Context) (uid string) {
	if ctx.Value(uid) != nil {
		uid = ctx.Value(uid).(string)
	}
	return uid
}
