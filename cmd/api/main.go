package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/satorunooshie/fireworks_stall/pkg/infrastructure/mysql"
	"github.com/satorunooshie/fireworks_stall/pkg/interfaces/router"
)

func main() {
	db, err := mysql.Conn()
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err := db.Close(); err != nil {
			log.Fatal(err)
		}
	}()
	count := 0

	// confirm connecting to the database
	for {
		if err := db.Ping(); err != nil {
			count++
			log.Println(err)
			if count > 10 {
				log.Fatal(err)
			}
			// sleep for a bit
			time.Sleep(5 * time.Second)
			continue
		}
		log.Println("db is connected !")
		break
	}

	// set up the router and server
	h := http.NewServeMux()
	router.Route(h, db.DB)
	srv := &http.Server{
		Addr:    ":8888",
		Handler: h,
	}

	// serve the server with other goroutine
	go func() {
		if err := srv.ListenAndServe(); err != nil {
			log.Fatalf("Server closed with error: %s", err)
		}
	}()

	// gracefully shutdown
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGTERM, os.Interrupt)
	log.Printf("SIGNAL %d received, shutting down", <-sig)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Println("Failed to gracefully shutdown:", err)
	}
	log.Println("Server closed")
}
