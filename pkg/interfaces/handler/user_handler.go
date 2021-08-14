//go:generate mockgen -source=$GOFILE -destination=mock_$GOPACKAGE/mock_$GOFILE
package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/satorunooshie/fireworks_stall/pkg/dcontext"
	userU "github.com/satorunooshie/fireworks_stall/pkg/usecase"
)

type UserHandler interface {
	HandleGetLevel() http.HandlerFunc
	HandleInsert() http.HandlerFunc
	HandleUpdate() http.HandlerFunc
	HandleDelete() http.HandlerFunc
}

type userHandler struct {
	userUseCase userU.UserUseCase
}

// NewUserHandler returns a new UserHandler
func NewUserHandler(userU userU.UserUseCase) UserHandler {
	return &userHandler{
		userUseCase: userU,
	}
}

// HandleGetLevel はユーザのアンロックレベルを返す
func (userH *userHandler) HandleGetLevel() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		ctx := request.Context()
		uid := dcontext.GetUIDFromContext(ctx)
		if uid == "" {
			log.Print("[ERROR] user not found")
			http.Error(writer, "user not found", http.StatusBadRequest)
			return
		}
		user, err := userH.userUseCase.SelectUser(ctx, uid)
		if err != nil {
			log.Printf("[ERROR] select user: %v", err.Error())
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
		if user == nil {
			log.Print("[ERROR] user not found")
			http.Error(writer, "user not found", http.StatusBadRequest)
			return
		}
		transferredResponse := &userHandleGetLevelResponse{
			Level: user.Level,
		}
		res, err := json.Marshal(transferredResponse)
		if err != nil {
			log.Printf("[ERROR] marshal json: %v", err.Error())
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
		writer.WriteHeader(http.StatusOK)
		writer.Header().Set("Content-Type", "application/json")
		writer.Write(res)
	}
}

// HandleInsert ...
func (userH *userHandler) HandleInsert() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		panic("do something")
	}
}

// HandleUpdate ...
func (userH *userHandler) HandleUpdate() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		panic("do something")
	}
}

// HandleDelete ...
func (userH *userHandler) HandleDelete() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		panic("do something")
	}
}

//nolint
// UserRequest
type UserRequest struct {
	// Need to implement field
}

//nolint
// UserResponse
type UserResponse struct {
	// Need to implement field
}

type userHandleGetLevelResponse struct {
	Level int32 `json:"level"`
}
