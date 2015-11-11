"use strict";

const config = require('config');

module.exports = () => {
  return (err, req, res, next) => { // jshint ignore:line

    let statusCode = err.statusCode || 500;
    let message = err.error.message;
    let stack = config.ENV_PROD ? null : err.error.stack;

    res.status(statusCode).json({
      error: message,
      stack: stack
    });
  };
};
