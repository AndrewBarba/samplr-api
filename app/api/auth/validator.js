"use strict";

const CommonValidator = require('api/common/validator');

class AuthValidator extends CommonValidator {

  validateRegister(req, res, next) {

    req.checkBody('email').notEmpty().isEmail();
    req.checkBody('password').notEmpty().isString().len(6, 128);
    req.checkBody('firstName').notEmpty().isString();
    req.checkBody('lastName').notEmpty().isString();

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
