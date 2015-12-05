"use strict";

const CommonValidator = require('api/common/validator');

class SurveyValidator extends CommonValidator {

  validateCreate(req, res, next) {

    req.checkBody('name').notEmpty().isString();
    req.checkBody('groupId').notEmpty().isString();
    req.checkBody('schedule').notEmpty().isArray();
    req.checkBody('start').notEmpty().isNumber();
    req.checkBody('end').notEmpty().isNumber();

    this.validate(req, res, next);
  }

  validateUpdate(req, res, next) {

    req.checkBody('name').notEmpty().isString();

    this.validate(req, res, next);
  }
}

module.exports = new SurveyValidator();
