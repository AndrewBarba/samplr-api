"use strict";

const CommonValidator = require('api/common/validator');

class ResponseValidator extends CommonValidator {

  validateUpdate(req, res, next) {

    req.checkBody('value').notEmpty().isNumber();

    this.validate(req, res, next);
  }
}

module.exports = new ResponseValidator();
