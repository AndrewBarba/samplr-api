"use strict";

const logger = require('logger');
const config = require('config');

module.exports = () => {
  return (err, req, res, next) => { // jshint ignore:line

    logger.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message;
    let stack = config.ENV_PROD ? null : err.stack;

    res.status(statusCode).json({
      error: message,
      stack: stack
    });
  };
};
