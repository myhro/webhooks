PRETTIER_OPTS = --quote-props consistent --single-quote --trailing-comma es5

check:
	npm run prettier -- $(PRETTIER_OPTS) --check "src/*.js"

clean:
	rm -rf .cache/ dist/

lint:
	npm run eslint

prettier:
	npm run prettier -- $(PRETTIER_OPTS) --write "src/*.js"

serve:
	npm run serve

watch:
	npm run watch
