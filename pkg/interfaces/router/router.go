package router

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/satorunooshie/fireworks_stall/pkg/infrastructure/mysql/repoimpl"
	"github.com/satorunooshie/fireworks_stall/pkg/interfaces/handler"
	"github.com/satorunooshie/fireworks_stall/pkg/interfaces/middleware"
	"github.com/satorunooshie/fireworks_stall/pkg/usecase"
)

func Route(h *http.ServeMux, db *sql.DB) {
	// this endpoint is for health check
	h.HandleFunc("/health", middleware.Get(func(w http.ResponseWriter, r *http.Request) {
		health := struct {
			Ping string `json:"ping"`
		}{
			Ping: "pong",
		}
		_ = json.NewEncoder(w).Encode(health)
	}))
	auth := middleware.NewAuth(db)
	h.HandleFunc("/auth/health", auth.Auth(middleware.Get(func(w http.ResponseWriter, r *http.Request) {
		health := struct {
			Ping string `json:"ping"`
		}{
			Ping: "pong",
		}
		_ = json.NewEncoder(w).Encode(health)
	})))
	ur := repoimpl.NewUserRepoImpl(db)
	uu := usecase.NewUserUsecase(ur)
	u := handler.NewUserHandler(uu)

	h.HandleFunc("/level", middleware.Get(auth.Auth(u.HandleGetLevel())))
	h.HandleFunc("/score", middleware.Put(auth.Auth(u.HandleSaveScore())))
  h.HandleFunc("/ranking", middleware.Get(auth.Auth(u.HandleGetRanking())))
}
