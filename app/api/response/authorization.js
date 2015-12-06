"use strict";

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
}

module.exports = new ResponseAuth();
