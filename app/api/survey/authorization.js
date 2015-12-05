"use strict";

const Errors = require('app/errors');
const CommonAuth = require('api/common/authorization');

// Modules
const Survey = require('modules/survey');

class SurveyAuth extends CommonAuth {

  /**
   * Requires user to own survey in url
   *
   * @method requiresSurveyOwner
   */
  requiresSurveyOwner(req, res, next) {
    this.requiresLogin(req, res, err => {
      if (err) return next(err);

      Survey
        .read(req.body.surveyId || req.params.id)
        .pluck('userId')
        .execute((err, survey) => {
          if (err || !survey) return next(new Errors.NotFoundError());
          return survey.userId === req.userId ? next() : next(new Errors.ForbiddenError());
        });
    });
  }
}

module.exports = new SurveyAuth();
