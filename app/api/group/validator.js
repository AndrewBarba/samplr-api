"use strict";

const CommonValidator = require('api/common/validator');

class GroupValidator extends CommonValidator {

  validateCreate(req, res, next) {

    req.checkBody('name').notEmpty().isString();

    this.validate(req, res, next);
  }

  validateUpdate(req, res, next) {

    req.checkBody('name').notEmpty().isString();

    this.validate(req, res, next);
  }
}

module.exports = new GroupValidator();
