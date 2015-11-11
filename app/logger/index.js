"use strict";

const winston = require('winston');
const config = require('config');

const consoleTransport = new winston.transports.Console({
  level: config.logger.level,
  colorize: true
});

const logger = new winston.Logger({
  transports: [consoleTransport]
});

winston.addColors({
  info: 'blue',
  warn: 'yellow',
  error: 'red'
});

module.exports = logger;
