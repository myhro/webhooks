BINARY := server

build:
	go build -ldflags "-s -w" -o $(BINARY) main.go

clean:
	rm -f $(BINARY)

run:
	go run main.go
