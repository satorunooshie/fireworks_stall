ENV_DEV = $(shell cat .env.dev)
ROOT_PASS = Password!

.PHONY: up
up:
	docker compose up --build -d

.PHONY: down
down:
	docker compose down -v

.PHONY: ps
ps:
	docker compose ps

.PHONY: test
test:
	docker compose exec api richgo test ./... -v -coverprofile cover.out -count=1
	docker compose exec api go tool cover -html=cover.out -o cover.html

.PHONY: gen
gen:
	go generate ./...

.PHONY: lint
lint:
	docker-compose exec api golangci-lint run -v

.PHONY: test-lint
test-lint: test lint

.PHONY: log
log:
	docker compose logs -f

.PHONY: api-log
api-log:
	docker compose logs -f api

.PHONY: db-log
db-log:
	docker compose logs -f db

.PHONY: deps
deps:
	cat tools.go | awk -F'"' '/_/ {print $$2}' | xargs -tI {} go install {}
