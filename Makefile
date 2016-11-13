.PHONY: all
.PHONY: bench test lint styles build check package
.PHONY: server clean tags

LIB_NAME     = projector

ASSETS_DIR   = assets
BIN_DIR      = ./node_modules/.bin
BUILD_DIR    = build
CACHE_DIR    = .cache
COVERAGE_DIR = coverage
DIST_DIR     = dist
PERF_DIR     = tests/perf
SCRIPT_DIR   = scripts
TEST_DIR     = tests

PERF_TESTS = $(shell find $(PERF_DIR) -name "*.perf.js")

DIR = .

BRANCH   ?= $(shell git rev-parse --abbrev-ref HEAD)
VERSION   = $(shell git describe --tags HEAD)
REVISION  = $(shell git rev-parse HEAD)
STAMP     = $(REVISION).$(shell date +%s)

all: setup build lint check test bench

dirs:
	mkdir -p $(DIST_DIR) $(BUILD_DIR) $(COVERAGE_DIR) $(CACHE_DIR) $(ASSETS_DIR)

setup: dirs
	$(SCRIPT_DIR)/symlink.sh

flow-stop:
	$(BIN_DIR)/flow stop

check:
	$(BIN_DIR)/flow
	$(SCRIPT_DIR)/check-coverage.sh

test:
	NODE_ENV=test $(BIN_DIR)/jest -c .jestrc

lint:
	$(BIN_DIR)/eslint ./src

build: dirs assets styles source

assets:
	cp -r $(ASSETS_DIR) $(BUILD_DIR)

styles:
	$(BIN_DIR)/node-sass \
		--source-map true \
		--source-map-embed \
		--source-map-contents \
		--output-style compressed \
		./styles/index.sass > $(BUILD_DIR)/index.css

constants:
	VERSION="$(VERSION)" \
	REVISION="$(REVISION)" \
	STAMP="$(STAMP)" \
	NODE_ENV="$(NODE_ENV)" \
	MIXPANEL_TOKEN="$(MIXPANEL_TOKEN)" \
	GITHUB_TOKEN="$(GITHUB_TOKEN)" \
		envsubst < src/_metadata.js > src/metadata.js

source: constants
	touch $(CACHE_DIR)/browserify-cache.json
	mv $(CACHE_DIR)/browserify-cache.json browserify-cache.json
	$(BIN_DIR)/browserifyinc \
		src/app.js \
		--debug \
		-t babelify \
		| $(BIN_DIR)/exorcist $(BUILD_DIR)/$(LIB_NAME).js.map \
		> $(BUILD_DIR)/_$(LIB_NAME).js
	mv $(BUILD_DIR)/_$(LIB_NAME).js $(BUILD_DIR)/$(LIB_NAME).js
	mv browserify-cache.json $(CACHE_DIR)/browserify-cache.json

package: clean build
	cp -r index.html $(BUILD_DIR) $(DIST_DIR)
	sed -i 's build/$(LIB_NAME) build/$(STAMP) g' $(DIST_DIR)/index.html
	sed -i 's build/index build/$(STAMP) g'  $(DIST_DIR)/index.html
	mv $(DIST_DIR)/$(BUILD_DIR)/index.css $(DIST_DIR)/$(BUILD_DIR)/$(STAMP).css
	$(BIN_DIR)/uglifyjs $(DIST_DIR)/$(BUILD_DIR)/$(LIB_NAME).js > $(DIST_DIR)/$(BUILD_DIR)/$(STAMP).js
	rm $(DIST_DIR)/$(BUILD_DIR)/$(LIB_NAME).js
	gzip -c -9 $(DIST_DIR)/$(BUILD_DIR)/$(STAMP).css > $(DIST_DIR)/$(BUILD_DIR)/$(STAMP).css.gz
	gzip -c -9 $(DIST_DIR)/$(BUILD_DIR)/$(STAMP).js  > $(DIST_DIR)/$(BUILD_DIR)/$(STAMP).js.gz

server:
	$(BIN_DIR)/static-server -n $(DIR)/index.html -f $(DIR)

tags: .ctagsignore
	rm -f tags
	ctags src

.ctagsignore: node_modules
	ls -fd1 node_modules/* > $@

clean:
	rm -rf $(BUILD_DIR) $(DIST_DIR) $(CACHE_DIR) tags

cleanall: clean
	rm -rf node_modules yarn.lock $(COVERAGE_DIR)

FORCE:
