
default:
	rm -rf node_modules
	npm cache clean
	npm install

start:
	node process/server-cluster

worker:
	node process/worker-cluster

lint:
	gulp jshint

updates:
	npm outdated --depth 0

post-install:
	cd ./node_modules; \
	ln -snf ../app; \
	ln -snf ../app/api; \
	ln -snf ../app/config; \
	ln -snf ../app/lib; \
	ln -snf ../app/logger; \
	ln -snf ../app/modules; \
	ln -snf ../test;

test-all:
	gulp jshint
	@NODE_ENV=test \
	node node_modules/.bin/mocha \
	--timeout 20000 \
	./test

test-unit:
	@NODE_ENV=test \
	node node_modules/.bin/mocha \
	--timeout 20000 \
	./test/unit

test-int:
	@NODE_ENV=test \
	node node_modules/.bin/mocha \
	--timeout 20000 \
	./test/integration

test-coverage:
	@NODE_ENV=test \
	istanbul \
	cover \
	node_modules/.bin/_mocha \
	-- \
	--timeout 20000 \
	./test
