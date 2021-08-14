//go:generate mockgen -source=$GOFILE -destination=mock_$GOPACKAGE/mock_$GOFILE
package repoimpl

import (
	"context"
	"database/sql"
	"log"

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

// SelectUser
func (userI *userRepoImpl) SelectUser(ctx context.Context, uid string) (*userM.User, error) {
	row := userI.db.QueryRow("SELECT * FROM `user` WHERE `uid` = ?", uid)
	return convertToUser(row)
}

// SelectUsers
func (userI *userRepoImpl) SelectUsers(ctx context.Context) ([]*userM.User, error) {
	rows, err := userI.db.Query("SELECT * FROM `user` ORDER BY `score` DESC LIMIT 10")
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	log.Println(rows == nil, rows.NextResultSet(), rows.Scan() == nil)
	return convertToUsers(rows)
}

// SelectUserScoreRank
func (userI *userRepoImpl) SelectUserScoreRank(ctx context.Context, score int32) (int32, error) {
	row := userI.db.QueryRow("SELECT COUNT(*) + 1 FROM `user` WHERE `score` < ?", score)
	e := struct {
		Count int32
	}{}
	if err := row.Scan(&e.Count); err != nil {
		return 0, err
	}
	return e.Count, nil
}

// Insert
func (userI *userRepoImpl) Insert(ctx context.Context, entity *userM.User) error {
	stmt, err := userI.db.PrepareContext(ctx, "INSERT INTO `user` (`uid`, `name`, `score`, `level`) VALUES (?, ?, ?, ?)")
	if err != nil {
		return err
	}
	if _, err := stmt.Exec(entity.UID, entity.Name, entity.Score, entity.Level); err != nil {
		return err
	}
	return nil
}

// Update
func (userI *userRepoImpl) Update(ctx context.Context, entity *userM.User) error {
	stmt, err := userI.db.Prepare("UPDATE `user` SET `score` = ?, `level` = ? WHERE `uid` = ?")
	if err != nil {
		return err
	}
	if _, err := stmt.Exec(entity.Score, entity.Level, entity.UID); err != nil {
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
func convertToUser(row *sql.Row) (*userM.User, error) {
	user := userM.User{}
	if err := row.Scan(&user.UID, &user.Name, &user.Score, &user.Level, &user.CreatedAt, &user.UpdatedAt); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

// convertToUsers
//nolint
func convertToUsers(rows *sql.Rows) ([]*userM.User, error) {
	var users []*userM.User
	for rows.Next() {
		var user userM.User
		if err := rows.Scan(&user.UID, &user.Name, &user.Score, &user.Level, &user.CreatedAt, &user.UpdatedAt); err != nil {
			return nil, err
		}
		users = append(users, &user)
	}
	return users, nil
}
