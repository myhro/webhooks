API_URL ?= 127.0.0.1:8787
PARCEL_FILES := src/index.html src/404.html

build: clean env
	npx parcel build $(PARCEL_FILES)

check:
	npx prettier --check src/*.ts*

clean:
	rm -rf .parcel-cache/ dist/ .env

deps:
	npm ci

env:
	echo "API_URL=$(API_URL)" > .env

lint:
	npx eslint src/*.ts*

prettier:
	npx prettier --write src/*.ts*

serve:
	npx serve dist/

tsc:
	npx tsc --noEmit

watch: clean env
	npx parcel $(PARCEL_FILES)
