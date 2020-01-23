FROM alpine:latest

RUN mkdir /app

COPY ./api/server /app/api
COPY ./webapp/server /app/webapp

WORKDIR /app
