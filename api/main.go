package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"github.com/gorilla/websocket"
)

var client *redis.Client
var upgrader websocket.Upgrader

type message struct {
	Body    string              `json:"body"`
	Date    string              `json:"date"`
	Headers map[string][]string `json:"headers"`
	IP      string              `json:"ip"`
	Method  string              `json:"method"`
	Proto   string              `json:"proto"`
}

func checkOrigin(r *http.Request) bool {
	return true
}

func listen(c *gin.Context) {
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Print("Error during upgrade: ", err)
		return
	}
	defer ws.Close()

	channel := c.Param("chan")
	sub := client.Subscribe(channel)
	defer sub.Unsubscribe()

	ch := sub.Channel()
	for msg := range ch {
		err = ws.WriteMessage(websocket.TextMessage, []byte(msg.Payload))
		if err != nil {
			log.Print("Error writing message: ", err)
			break
		}
	}
}

func webhook(c *gin.Context) {
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.String(http.StatusBadRequest, "Bad Request")
		return
	}

	msg := message{
		Body:    string(body),
		Date:    time.Now().Format("2006-01-02 15:04:05-0700"),
		Headers: c.Request.Header,
		IP:      strings.Split(c.Request.RemoteAddr, ":")[0],
		Method:  c.Request.Method,
		Proto:   c.Request.Proto,
	}

	resp, err := json.Marshal(msg)
	if err != nil {
		log.Print(err)
		c.String(http.StatusInternalServerError, "Internal Server Error")
		return
	}

	channel := c.Param("chan")
	client.Publish(channel, string(resp))
}

func init() {
	client = redis.NewClient(&redis.Options{})
	_, err := client.Ping().Result()
	if err != nil {
		log.Fatal("Error while connecting to Redis: ", err)
	}

	upgrader = websocket.Upgrader{}
}

func main() {
	r := gin.Default()

	r.DELETE("/:chan", webhook)
	r.GET("/:chan", webhook)
	r.HEAD("/:chan", webhook)
	r.OPTIONS("/:chan", webhook)
	r.PATCH("/:chan", webhook)
	r.POST("/:chan", webhook)
	r.PUT("/:chan", webhook)

	r.GET("/:chan/listen", listen)

	upgrader.CheckOrigin = checkOrigin

	log.Print("Starting server...")
	r.Run()
}
