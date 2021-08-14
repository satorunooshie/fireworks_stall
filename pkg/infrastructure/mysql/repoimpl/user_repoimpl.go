//go:generate mockgen -source=$GOFILE -destination=mock_$GOPACKAGE/mock_$GOFILE
package repoimpl

import (
	"context"
	"database/sql"

	userM "github.com/satorunooshie/fireworks_stall/pkg/domain/model"
	userR "github.com/satorunooshie/fireworks_stall/pkg/domain/repository"
)

type userRepoImpl struct {
	db *sql.DB
}

func NewUserRepoImpl(db *sql.DB) userR.UserRepository {
	return &userRepoImpl{
		db,
	}
}

// Select
func (userI *userRepoImpl) Select(ctx context.Context, uid string) ([]*userM.User, error) {
	rows, err := userI.db.Query("SELECT * FROM user WHERE uid =" + uid)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return convertToUser(rows)
}

// Insert
func (userI *userRepoImpl) Insert(ctx context.Context, entity *userM.User) error {
	stmt, err := userI.db.PrepareContext(ctx, "INSERT INTO `user` (`uid`, `name`, `score`) VALUES (?, ?, ?)")
	if err != nil {
		return err
	}
	if _, err := stmt.Exec(entity.UID, entity.Name, entity.Score); err != nil {
		return err
	}
	return nil
}

// Update
func (userI *userRepoImpl) Update(ctx context.Context, entity *userM.User) error {
	stmt, err := userI.db.Prepare("UPDATE user SET WHERE ")
	if err != nil {
		return err
	}
	if _, err := stmt.Exec(); err != nil {
		return err
	}
	return nil
}

// Delete
func (userI *userRepoImpl) Delete(ctx context.Context, entity *userM.User) error {
	stmt, err := userI.db.Prepare("DELETE FROM user WHERE ")
	if err != nil {
		return err
	}
	if _, err := stmt.Exec(); err != nil {
		return err
	}
	return nil
}

// convertToUser
func convertToUser(rows *sql.Rows) ([]*userM.User, error) {
	var users []*userM.User
	for rows.Next() {
		var user *userM.User
		err := rows.Scan(
		// Need to scan field
		)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}
