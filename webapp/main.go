package main

import (
	"log"
	"net/http"

	"github.com/gobuffalo/packr"
)

func main() {
	box := packr.NewBox("./dist")
	port := ":3000"

	http.Handle("/", http.FileServer(box))

	log.Print("Listening and serving HTTP on ", port)
	http.ListenAndServe(port, nil)
}
