"use strict";

class Modules {
  constructor() {}

  get auth() { return this._auth; }
  get user() { return this._user; }

  init(next) {

    // Load all modules
    this._auth = require('./auth');
    this._user = require('./user');

    next();
  }
}

module.exports = new Modules();
