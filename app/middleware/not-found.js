"use strict";

const Errors = require('errors');

module.exports = () => {
  return (req, res, next) => {
    next(new Errors.NotFoundError());
  };
};
