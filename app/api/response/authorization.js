"use strict";

const _ = require('underscore');
const Errors = require('app/errors');
const CommonAuth = require('api/common/authorization');

// Modules
const Response = require('modules/response');

class ResponseAuth extends CommonAuth {

  /**
   * Requires user to own response in url
   *
   * @method requiresGroupOwner
   */
  requiresResponseOwner(req, res, next) {
    this.requiresLogin(req, res, err => {
      if (err) return next(err);

      Response
        .read(req.body.responseId || req.params.id)
        .pluck('userId')
        .execute((err, response) => {
          if (err || !response) return next(new Errors.NotFoundError());
          return response.userId === req.userId ? next() : next(new Errors.ForbiddenError());
        });
    });
  }

  /**
   * Requires user to own responses in POST body
   *
   * @method requiresResponsesOwner
   */
  requiresResponsesOwner(req, res, next) {
    this.requiresLogin(req, res, err => {
      if (err) return next(err);

      let responseIds = _.pluck(req.body.responses, 'id');

      Response
        .listIndex('id', responseIds)
        .pluck('userId')
        .execute((err, responses) => {
          if (err || !responses || responses.length !== responseIds.length) return next(new Errors.NotFoundError());

          for (let response of responses) {
            if (response.userId !== req.userId) return next(new Errors.ForbiddenError());
          }

          return next();
        });
    });
  }
}

module.exports = new ResponseAuth();
