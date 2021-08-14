package mysql

import (
	"database/sql"
	"fmt"

	// mysqldriver is a MySQL driver for Go.
	_ "github.com/go-sql-driver/mysql"
)

// DB is connection to MySQL database struct.
type DB struct {
	*sql.DB
}

// Conn connection to MySQL database.
func Conn() (*DB, error) {
	db, err := sql.Open("mysql", fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=true",
		"user", "Password!", "mysql", "3306", "fireworks"))
	if err != nil {
		return nil, err
	}
	db.SetMaxIdleConns(10)
	db.SetMaxOpenConns(100)
	return &DB{db}, nil
}
