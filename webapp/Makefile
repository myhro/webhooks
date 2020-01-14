PRETTIER_OPTS = --quote-props consistent --single-quote --trailing-comma es5

build: clean
	echo "API_URL=webhooks.myhro.info" > .env
	npm run parcel -- build src/index.html

check:
	npm run prettier -- $(PRETTIER_OPTS) --check "src/*.js"

clean:
	rm -rf .cache/ dist/ .env

lint:
	npm run eslint

prettier:
	npm run prettier -- $(PRETTIER_OPTS) --write "src/*.js"

serve:
	npm run serve

watch:
	echo "API_URL=127.0.0.1:8080" > .env
	npm run parcel -- watch src/index.html