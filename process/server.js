"use strict";

if (process.env.NEWRELIC) {
  require('newrelic');
}

const async = require('async');
const app = require('app');
const config = require('config');
const logger = require('logger');
const EventEmitter = require('events').EventEmitter;

// Server to emit events
const server = new EventEmitter();

logger.info(`Samplr API: ${config.env}\n`);

async.series([
  done => {
    logger.info('Initializing connections...');
    app.connections.init(done);
  },
  done => {
    logger.info('Connections loaded.\n');
    logger.info('Initializing modules...');
    app.modules.init(done);
  },
  done => {
    logger.info('Modules loaded.\n');
    logger.info('Initializing api...');
    app.api.init(done);
  },
  done => {
    logger.info('Api loaded.\n');
    logger.info('Initializing server...');
    app.api.listen(done);
  }
], err => {
  if (err) throw err;
  server.emit('ready', app.api.app);
  logger.info('Server listening on port:', config.http.port);
});

module.exports = server;
