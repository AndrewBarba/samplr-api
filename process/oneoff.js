"use strict";

const async = require('async');
const app = require('app');
const config = require('config');
const logger = require('logger');

// script
const SCRIPT = process.argv[2];

if (!SCRIPT) throw new Error('A script is required to run.');

logger.info(`Samplr API Oneoff: ${config.env}`);
logger.info(`${SCRIPT}\n`);

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
  logger.info('Running script...');
  require(`../${SCRIPT}`);
});
