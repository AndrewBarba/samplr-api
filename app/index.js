"use strict";

class App {
  constructor() {
    this._config = require('config');
    this._api = require('api');
    this._modules = require('modules');
    this._connections = require('connections');
  }

  get config() { return this._config; }
  get api() { return this._api; }
  get modules() { return this._modules; }
  get connections() { return this._connections; }
}

module.exports = new App();
