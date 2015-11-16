"use strict";

const async = require('async');
const request = require('supertest');
const app = require('app');

class Agent {

  constructor() {
    this._server = null;
  }

  client() {
    return request.agent(this._server);
  }

  start(next) {
    async.series([
      done => {
        app.connections.init(done);
      },
      done => {
        app.modules.init(done);
      },
      done => {
        app.api.init(done);
      }
    ], err => {
      if (err) return next(err);
      this._server = app.api.server;
      next();
    });
  }
}

module.exports = new Agent();
