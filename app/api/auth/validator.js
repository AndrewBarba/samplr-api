"use strict";

const CommonValidator = require('api/common/validator');

class AuthValidator extends CommonValidator {

  validateRegister(req, res, next) {

    req.checkBody('email').notEmpty().isEmail();
    req.checkBody('password').notEmpty().isString();
    req.checkBody('firstName').notEmpty().isString();
    req.checkBody('lastName').notEmpty().isString();
    req.checkBody('type').notEmpty().isString();

    if ('age' in req.body) req.sanitizeBody('age').toInt();

    this.validate(req, res, next);
  }

  validateLogin(req, res, next) {

    req.checkBody('email').notEmpty().isEmail();
    req.checkBody('password').notEmpty().isString();

    this.validate(req, res, next);
  }
}

module.exports = new AuthValidator();
