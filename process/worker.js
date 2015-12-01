"use strict";

process.env.APP_NAME += '-worker';

if (process.env.NEW_RELIC) {
  require('newrelic');
}

const async = require('async');
const app = require('app');
const config = require('config');
const logger = require('logger');

logger.info(`Samplr API Worker: ${config.env}\n`);

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
    logger.info('Starting worker...');
    app.worker.start(done);
  }
], err => {
  if (err) throw err;
  logger.info('Worker started.');
});
