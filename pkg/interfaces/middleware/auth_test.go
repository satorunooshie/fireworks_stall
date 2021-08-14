package middleware

import (
	"testing"
)

func TestAuth(t *testing.T) {
	t.Skip("WithCredentialsJSONを使うかモックする")
	//	t.Parallel()
	//	tests := []struct {
	//		path    string
	//		method  string
	//		handler func() http.HandlerFunc
	//		token   string
	//		want    int
	//	}{
	//		{
	//			path:   "/",
	//			method: http.MethodGet,
	//			handler: func() http.HandlerFunc {
	//				return func(rw http.ResponseWriter, req *http.Request) {}
	//			},
	//			want: http.StatusOK,
	//		},
	//		{
	//			path:   "/auth",
	//			method: http.MethodGet,
	//			handler: func() http.HandlerFunc {
	//				return Auth(func(rw http.ResponseWriter, req *http.Request) {})
	//			},
	//			token: "Bearer test",
	//			want:  http.StatusUnauthorized,
	//		},
	//		{
	//			path:   "/auth",
	//			method: http.MethodGet,
	//			handler: func() http.HandlerFunc {
	//				return Auth(func(rw http.ResponseWriter, req *http.Request) {})
	//			},
	//			token: "", // 明示的になし
	//			want:  http.StatusBadRequest,
	//		},
	//	}
	//	for _, tt := range tests {
	//		tt := tt
	//		t.Run("", func(t *testing.T) {
	//			t.Parallel()
	//			ts := httptest.NewServer(tt.handler())
	//			defer ts.Close()
	//			var u bytes.Buffer
	//			u.WriteString(ts.URL)
	//			u.WriteString(tt.path)
	//
	//			req, err := http.NewRequest(tt.method, u.String(), nil)
	//			if err != nil {
	//				t.Fatalf("%v", err)
	//			}
	//			req.Header.Set("Authorization", tt.token)
	//			client := &http.Client{}
	//			res, _ := client.Do(req)
	//			if res.StatusCode != tt.want {
	//				t.Errorf("status %v", res.Status)
	//			}
	//		})
	//	}
}
