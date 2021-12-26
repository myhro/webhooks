ENV ?= staging

deploy:
	npx wrangler publish --env $(ENV)

deploy-do:
	npx wrangler publish --env $(ENV) --new-class Listener

deps:
	npm ci

dev:
	npx wrangler dev

lint:
	npx prettier --check src/*.js
	npx eslint src/*.js

prettier:
	npx prettier --write src/*.js

rollback-do:
	npx wrangler publish --env $(ENV) --delete-class Listener
