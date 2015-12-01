"use strict";

const Errors = require('app/errors');
const CommonAuth = require('api/common/authorization');

// Modules
const Survey = require('modules/survey');

class SurveyAuth extends CommonAuth {

  /**
   * Requires user to own survey in url
   *
   * @method requiresGroupOwner
   */
  requiresGroupOwner(req, res, next) {
    this.requiresLogin(req, res, err => {
      if (err) return next(err);

      Survey
        .read(req.params.id)
        .getJoin({
          group: true
        })
        .run((err, survey) => {
          if (err || !survey || !survey.group) return next(new Errors.NotFoundError());
          return survey.group.userId === req.userId ? next() : next(new Errors.ForbiddenError());
        });
    });
  }
}

module.exports = new SurveyAuth();
