"use strict";

const CommonValidator = require('api/common/validator');

class SurveyValidator extends CommonValidator {

  validateCreate(req, res, next) {

    req.checkBody('title').notEmpty().isString();
    req.checkBody('surveyId').notEmpty().isString();
    req.checkBody('responses').notEmpty().isArray();

    this.validate(req, res, next);
  }

  validateUpdate(req, res, next) {

    req.checkBody('title').notEmpty().isString();

    this.validate(req, res, next);
  }
}

module.exports = new SurveyValidator();
