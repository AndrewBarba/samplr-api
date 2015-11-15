
start:
	node process/server-cluster

lint:
	gulp jshint

updates:
	npm outdated --depth 0

post-install:
	cd ./node_modules; \
	ln -snf ../app; \
	ln -snf ../app/api; \
	ln -snf ../app/config; \
	ln -snf ../app/connections; \
	ln -snf ../app/errors; \
	ln -snf ../app/lib; \
	ln -snf ../app/logger; \
	ln -snf ../app/middleware; \
	ln -snf ../app/modules; \
	ln -snf ../process; \
	ln -snf ../static; \
	ln -snf ../test;

test-all:
	gulp jshint
	node node_modules/.bin/mocha --timeout 20000 --recursive

test-unit:
	node node_modules/.bin/mocha --timeout 20000 --recursive ./test/unit/

test-int:
	node node_modules/.bin/mocha --timeout 20000 --recursive ./test/integration/
