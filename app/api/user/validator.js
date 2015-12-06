"use strict";

const CommonValidator = require('api/common/validator');

class UserValidator extends CommonValidator {

  validateAddPush(req, res, next) {

    req.checkBody('token').notEmpty().isString();
    req.checkBody('type').notEmpty().isString();

    this.validate(req, res, next);
  }

  validateCompleteResponses(req, res, next) {

    req.checkBody('responses').notEmpty().isArray();

    this.validate(req, res, next);
  }
}

module.exports = new UserValidator();
