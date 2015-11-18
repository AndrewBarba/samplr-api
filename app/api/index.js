"use strict";

const http = require('http');
const path = require('path');
const express = require('express');
const swagger = require("swagger-node-express");
const config = require('config');

// Middleware
const cors = require('app/middleware/cors');
const gzip = require('app/middleware/gzip');
const parser = require('app/middleware/parser');
const headers = require('app/middleware/headers');
const notFound = require('app/middleware/not-found');
const errors = require('app/middleware/errors');

class Api {
  constructor() {
    this._app = null;
    this._server = null;
    this._port = config.http.port;
  }

  get app() { return this._app; }
  get port() { return this._port; }
  get server() { return this._server; }

  loadRoutes() {
    require('./routes');
  }

  init(next) {
    // create app
    let app = this._app = express();
    let server = this._server = http.createServer(app);
    this.configureSwagger(app);

    // load middleware
    app.use(gzip());
    app.use(cors());
    app.use(parser());
    app.use(headers());

    // load routes
    this.loadRoutes();

    // Expose docs
    this.configureSwaggerDocs();

    // not found
    app.use(notFound());

    // errors
    app.use(errors());

    return next(null, server);
  }

  listen(next) {
    return this.server.listen(this.port, err => {
      next(err, this.server);
    });
  }

  configureSwagger(app) {

    // Load swagegr
    swagger.setAppHandler(app);

    // Basic info
    swagger.setApiInfo({
      title: "Experience Sampling API",
      contact: "abarba@ccs.neu.edu"
    });

    // Api docs
    swagger.configureSwaggerPaths('', '/api-docs', '');
    app.use('/docs', express.static(path.join(__dirname, '../../docs')));
  }

  configureSwaggerDocs() {
    swagger.configure('/', config.app.version);
  }
}

module.exports = new Api();
