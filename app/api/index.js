"use strict";

const http = require('http');
const express = require('express');
const config = require('config');

// Middleware
const parser = require('middleware/parser');
const headers = require('middleware/headers');
const notFound = require('middleware/not-found');
const errors = require('middleware/errors');

class Api {
  constructor() {
    this._port = config.http.port;
  }

  get port() { return this._port; }
  get server() { return this._server; }

  init(next) {
    // create app
    let app = express();
    this._server = http.createServer(app);

    // load middleware
    app.use(parser());
    app.use(headers());

    // load routes
    app.use('/', require('./root').router);

    // not found
    app.use(notFound());

    // errors
    app.use(errors());

    return next(null, this.server);
  }

  listen(next) {
    return this.server.listen(this.port, () => {
      next();
    });
  }
}

module.exports = new Api();
