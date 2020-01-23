FROM alpine:latest

RUN mkdir /app

COPY ./api/server /app/api
COPY ./webapp/dist /app/dist
COPY ./webapp/server /app/webapp

WORKDIR /app
