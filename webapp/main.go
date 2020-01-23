package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	port := ":3000"

	r.Static("/", "./dist")

	if gin.Mode() == "release" {
		log.Print("Starting server on port ", port)
	}
	r.Run(port)
}
