package middleware

import (
	"context"
	"database/sql"
	"errors"
	"log"
	"net/http"
	"os"
	"strings"

	"google.golang.org/api/option"

	firebase "firebase.google.com/go"

	"github.com/satorunooshie/fireworks_stall/pkg/dcontext"
	"github.com/satorunooshie/fireworks_stall/pkg/domain/model"
	"github.com/satorunooshie/fireworks_stall/pkg/infrastructure/mysql/repoimpl"
	"github.com/satorunooshie/fireworks_stall/pkg/usecase"
)

type Auth struct {
	db *sql.DB
}

func NewAuth(db *sql.DB) *Auth {
	return &Auth{
		db: db,
	}
}

//nolint
func (a *Auth) Auth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		idToken := strings.Replace(authHeader, "Bearer ", "", 1)
		if idToken == "" {
			log.Printf("[INFO] middleware::Auth: %v\n", errors.New("header is not set"))
			w.WriteHeader(http.StatusBadRequest)
			// TODO: Delete debug code instead return json error message
			_, _ = w.Write([]byte("empty token\n"))
			return
		}

		path, err := a.getFilePath()
		if err != nil {
			log.Printf("[ERROR] middleware::Auth::getFilePath: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		opt := option.WithCredentialsFile(path)

		ctx := r.Context()
		if ctx == nil {
			ctx = context.Background()
		}

		app, err := firebase.NewApp(ctx, nil, opt)
		if err != nil {
			log.Printf("[ERROR] middleware::Auth::firebase.NewApp: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		auth, err := app.Auth(ctx)
		if err != nil {
			log.Printf("[ERROR] middleware::Auth::app.Auth: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		token, err := auth.VerifyIDToken(ctx, idToken)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			// TODO: Delete debug code instead return json error message
			_, _ = w.Write([]byte("error verifying ID token\n"))
			return
		}
		uri := repoimpl.NewUserRepoImpl(a.db)
		uc := usecase.NewUserUsecase(uri)
		user, err := uc.Select(ctx, token.UID)
		if user == nil {
			h := r.Header.Get("username")
			if h == "" {
				w.WriteHeader(http.StatusBadRequest)
				// TODO: Delete debug code instead return json error message
				_, _ = w.Write([]byte("error username is empty\n"))
				return
			}
			ent := &model.User{
				UID:  token.UID,
				Name: h,
			}
			if err := uc.Insert(ctx, ent); err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				// TODO: Delete debug code instead return json error message
				_, _ = w.Write([]byte("error insert user\n"))
				return
			}
		}
		dcontext.SetUID(ctx, token.UID)
		log.Printf("[INFO] Verified ID token: %v\n", token)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

// NOTE: 実行パスが違うのでトリミング
func (a *Auth) getFilePath() (string, error) {
	const (
		dirname  = "fireworks_stall"
		filename = "firebase-sdk.json"
	)
	cp, err := os.Getwd()
	if err != nil {
		return "", err
	}
	idx := strings.LastIndex(cp, dirname)
	return cp[:(idx+len(dirname))] + "/" + filename, nil
}
