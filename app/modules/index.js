"use strict";

class Modules {
  constructor() {}

  get common() { return this._common; }
  get auth() { return this._auth; }

  init(next) {
    this._common = require('./common');
    this._auth = require('./auth');
    next();
  }
}

module.exports = new Modules();
