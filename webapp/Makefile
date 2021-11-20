API_URL ?= 127.0.0.1:8080

build: clean env
	npx parcel build src/index.html

check:
	npx prettier --check src/*.ts*

clean:
	rm -rf .cache/ dist/ .env

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
	npx parcel src/index.html
