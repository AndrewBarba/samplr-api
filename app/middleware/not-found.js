"use strict";

const errors = require('errors');

module.exports = () => {
  return (req, res, next) => {
    next(new errors.NotFoundError());
  };
};
