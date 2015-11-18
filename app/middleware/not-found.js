"use strict";

const Errors = require('app/errors');

module.exports = () => {
  return (req, res, next) => {
    next(new Errors.NotFoundError());
  };
};
