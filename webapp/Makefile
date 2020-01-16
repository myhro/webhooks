build: clean env-prod
	npm run parcel -- build src/index.html

check:
	npm run prettier -- --check "src/*.ts*"

clean:
	rm -rf .cache/ dist/ .env
env:
	echo "API_URL=127.0.0.1:8080" > .env

env-prod:
	echo "API_URL=webhooks.myhro.info" > .env

lint:
	npm run eslint

prettier:
	npm run prettier -- --write "src/*.ts*"

serve:
	npm run serve

types:
	npm run types

watch: clean env
	npm run parcel -- src/index.html
