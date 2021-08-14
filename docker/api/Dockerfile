FROM golang:1.16

ENV GOCS=linux
ENV GOACH=amd64
ENV CGO_ENABLED=0
ENV GO111MODULE=on

WORKDIR /go/src/github.com/satorunooshie/fireworks_stall

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN make deps

CMD ["air", "-c", ".air.toml"]
