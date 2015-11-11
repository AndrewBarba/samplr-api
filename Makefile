
default:
	gulp lint && npm start

lint:
	gulp jshint

updates:
	npm outdated --depth 0

post-install:
	cd ./node_modules; \
	ln -snf ../static; \
	ln -snf ../app; \
	ln -snf ../app/modules; \
	ln -snf ../app/api; \
	ln -snf ../app/connections; \
	ln -snf ../app/middleware; \
	ln -snf ../app/config; \
	ln -snf ../app/logger; \
	ln -snf ../app/errors;

prod:
	git checkout master; \
	git merge dev; \
	git push; \
	git checkout dev;
