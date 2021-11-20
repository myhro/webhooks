API_URL ?= 127.0.0.1:8080
PARCEL_ENTRYPOINT := src/index.html
PRETTIER_FILES = src/*.ts*

build: clean env
	npm run parcel -- build $(PARCEL_ENTRYPOINT)

check:
	npm run prettier -- --check $(PRETTIER_FILES)

clean:
	rm -rf .cache/ dist/ .env

deps:
	npm ci

env:
	echo "API_URL=$(API_URL)" > .env

lint:
	npm run eslint

prettier:
	npm run prettier -- --write $(PRETTIER_FILES)

serve:
	npm run serve

types:
	npm run types

watch: clean env
	npm run parcel -- $(PARCEL_ENTRYPOINT)
