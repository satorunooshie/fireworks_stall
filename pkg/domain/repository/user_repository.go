//go:generate mockgen -source=$GOFILE -destination=mock_$GOPACKAGE/mock_$GOFILE
package repository

import (
	"context"

	userM "github.com/satorunooshie/fireworks_stall/pkg/domain/model"
)

type UserRepository interface {
	SelectUser(ctx context.Context, uid string) (*userM.User, error)
	SelectUsers(ctx context.Context) ([]*userM.User, error)
	Insert(ctx context.Context, entity *userM.User) error
	Update(ctx context.Context, entity *userM.User) error
	Delete(ctx context.Context, entity *userM.User) error
}
