"use strict";

const thinky = require('thinky');
const config = require('app/config');

class RethinkDB {
  constructor(options) {
    this._options = options;
  }

  get options() { return this._options; }

  init(next) {
    this.thinky = thinky(this.options);
    next();
  }
}

module.exports = new RethinkDB(config.rethinkdb);
