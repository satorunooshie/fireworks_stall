//go:generate mockgen -source=$GOFILE -destination=mock_$GOPACKAGE/mock_$GOFILE
package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/satorunooshie/fireworks_stall/pkg/dcontext"
	"github.com/satorunooshie/fireworks_stall/pkg/domain/model"
	userU "github.com/satorunooshie/fireworks_stall/pkg/usecase"
)

type UserHandler interface {
	HandleGetLevel() http.HandlerFunc
	HandleInsert() http.HandlerFunc
	HandleSaveScore() http.HandlerFunc
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
func (userH *userHandler) HandleSaveScore() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		var req userHandleSaveScoreRequest
		if err := json.NewDecoder(request.Body).Decode(&req); err != nil {
			log.Printf("[WARN] json decode: %v", err)
			http.Error(writer, err.Error(), http.StatusBadRequest)
			return
		}
		if req.Score <= 0 {
			log.Printf("[INFO] req.Score <= 0: %v", req.Score)
			http.Error(writer, "request invalid", http.StatusBadRequest)
			return
		}
		ctx := request.Context()
		uid := dcontext.GetUIDFromContext(ctx)

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
		if req.Score <= user.Score {
			writer.WriteHeader(http.StatusOK)
			writer.Header().Set("Content-Type", "application/json")
			return
		}
		// 条件分岐
		level := user.Level
		if l := calculateLevel(req.Score); user.Level < l {
			level = l
		}
		ent := &model.User{
			UID:   uid,
			Score: req.Score,
			Level: level,
		}
		if err := userH.userUseCase.Update(ctx, ent); err != nil {
			log.Printf("[ERROR] update user: %v", err.Error())
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
		writer.WriteHeader(http.StatusOK)
		writer.Header().Set("Content-Type", "application/json")
	}
}

// HandleInsert ...
func (userH *userHandler) HandleInsert() http.HandlerFunc {
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

type userHandleSaveScoreRequest struct {
	Score int32 `json:"score"`
}

func calculateLevel(score int32) int32 {
	switch {
	case score > 500:
		return 3
	case score > 300:
		return 2
	default:
		return 1

	}
}
