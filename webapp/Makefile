BINARY := server

build: clean env
	npm run parcel -- build src/index.html

build-prod: clean env-prod
	npm run parcel -- build src/index.html

bundle:
	go build -o $(BINARY) main.go

build-bundle: build bundle

build-bundle-prod: build-prod bundle

check:
	npm run prettier -- --check "src/*.ts*"

clean:
	rm -rf .cache/ dist/ .env $(BINARY)

deps:
	npm ci

env:
	echo "API_URL=127.0.0.1:8080" > .env

env-prod:
	echo "API_URL=webhooks.myhro.info" > .env

lint:
	npm run eslint

prettier:
	npm run prettier -- --write "src/*.ts*"

run:
	go run main.go

serve:
	npm run serve

types:
	npm run types

watch: clean env
	npm run parcel -- src/index.html
