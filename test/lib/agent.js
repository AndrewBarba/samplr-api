"use strict";

const request = require('supertest');

class Agent {

  constructor() {
    this._app = null;
  }

  get app() { return this._app; }
  get client() { return request(this._app); }

  start(next) {
    require('process/server').on('ready', app => {
      this._app = app;
      next(null, app);
    });
  }
}

module.exports = new Agent();
