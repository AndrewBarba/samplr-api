"use strict";

const thinky = require('thinky');
const config = require('app/config');

class RethinkDB {
  constructor(options) {
    this._thinky = null;
    this._options = options;
  }

  get thinky() { return this._thinky; }
  get options() { return this._options; }

  init(next) {
    this._thinky = thinky(this.options);
    next();
  }
}

module.exports = new RethinkDB(config.rethinkdb);
