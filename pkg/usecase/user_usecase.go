//go:generate mockgen -source=$GOFILE -destination=mock_$GOPACKAGE/mock_$GOFILE
package usecase

import (
	"context"

	userM "github.com/satorunooshie/fireworks_stall/pkg/domain/model"
	userR "github.com/satorunooshie/fireworks_stall/pkg/domain/repository"
)

type UserUseCase interface {
	SelectUser(ctx context.Context, uid string) (*userM.User, error)
	SelectUsers(ctx context.Context) ([]*userM.User, error)
	Insert(ctx context.Context, entity *userM.User) error
	Update(ctx context.Context, entity *userM.User) error
	Delete(ctx context.Context, entity *userM.User) error
}

type userUseCase struct {
	userRepository userR.UserRepository
}

// NewUserUsecase ...
func NewUserUsecase(userR userR.UserRepository) UserUseCase {
	return &userUseCase{
		userRepository: userR,
	}
}

// SelectUser ...
func (userU *userUseCase) SelectUser(ctx context.Context, uid string) (*userM.User, error) {
	user, err := userU.userRepository.SelectUser(ctx, uid)
	if err != nil {
		return nil, err
	}
	return user, nil
}

// SelectUsers ...
func (userU *userUseCase) SelectUsers(ctx context.Context) ([]*userM.User, error) {
	users, err := userU.userRepository.SelectUsers(ctx)
	if err != nil {
		return nil, err
	}
	return users, nil
}

// Insert ...
func (userU *userUseCase) Insert(ctx context.Context, entity *userM.User) error {
	err := userU.userRepository.Insert(ctx, entity)
	if err != nil {
		return err
	}
	return nil
}

// Update ...
func (userU *userUseCase) Update(ctx context.Context, entity *userM.User) error {
	err := userU.userRepository.Update(ctx, entity)
	if err != nil {
		return err
	}
	return nil
}

// Delete ...
func (userU *userUseCase) Delete(ctx context.Context, entity *userM.User) error {
	err := userU.userRepository.Delete(ctx, entity)
	if err != nil {
		return err
	}
	return nil
}
