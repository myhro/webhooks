FROM golang:1.13-alpine AS builder

RUN apk update
RUN apk add make upx
WORKDIR /app
COPY . /app
RUN make -C api/ build
RUN upx api/server

FROM alpine:latest

WORKDIR /app
COPY --from=builder /app/api/server /app/api
