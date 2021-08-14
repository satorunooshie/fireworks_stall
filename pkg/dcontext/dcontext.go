package dcontext

import (
	"context"
)

type key string

const (
	uidKey key = "uid"
)

func SetUID(ctx context.Context, uid string) context.Context {
	return context.WithValue(ctx, uidKey, uid)
}

//nolint
func GetUIDFromContext(ctx context.Context) string {
	var uid string
	if ctx.Value(uidKey) != nil {
		uid = ctx.Value(uidKey).(string)
	}
	return uid
}
