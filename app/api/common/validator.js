"use strict";

const Errors = require('app/errors');

class CommonValidator {

  validate(req, res, next) {
    if (!req.validationErrors()) return next();

    let error = req.validationErrors()[0];
    let message = `${error.msg} for ${error.param} - ${error.value}`;

    return next(new Errors.ValidatorError(message));
  }
}

module.exports = CommonValidator;
