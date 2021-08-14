package router

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

func Route(h *http.ServeMux, db *sql.DB) {
	// this endpoint is for health check
	h.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		health := struct {
			Ping string `json:"ping"`
		}{
			Ping: "pong",
		}
		_ = json.NewEncoder(w).Encode(health)
	})
}
