package middleware

import (
	"log"
	"net/http"
)

func Get(next http.HandlerFunc) http.HandlerFunc {
	return httpMethod(next, http.MethodGet)
}

//nolint
func Post(next http.HandlerFunc) http.HandlerFunc {
	return httpMethod(next, http.MethodPost)
}

//nolint
func Put(next http.HandlerFunc) http.HandlerFunc {
	return httpMethod(next, http.MethodPut)
}

//nolint
func Delete(next http.HandlerFunc) http.HandlerFunc {
	return httpMethod(next, http.MethodDelete)
}

func httpMethod(next http.HandlerFunc, method string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type, Accept, Origin, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		if r.Method == http.MethodOptions {
			return
		}
		if r.Method != method {
			w.WriteHeader(http.StatusMethodNotAllowed)
			if _, err := w.Write([]byte("Method not allowed")); err != nil {
				log.Println(err)
			}
			return
		}
		w.Header().Add("Content-Type", "application/json; charset=utf-8")
		next(w, r)
	}
}
