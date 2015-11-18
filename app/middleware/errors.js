"use strict";

const logger = require('logger');
const config = require('config');

module.exports = () => {
  return (err, req, res, next) => { // jshint ignore:line

    let statusCode = err.statusCode || 500;
    let message = err.message;
    let title = err.title;
    let stack = config.ENV_PROD ? null : err.stack;

    let json = {
      title: title,
      error: message
    };

    if (statusCode >= 500) {
      json.stack = stack;
      logger.error(err);
    }

    res.status(statusCode).json(json);
  };
};
