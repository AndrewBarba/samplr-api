"use strict";

const Errors = require('app/errors');
const CommonAuth = require('api/common/authorization');

// Modules
const Question = require('modules/question');

class QuestionAuth extends CommonAuth {

  /**
   * Requires user to own question in url
   *
   * @method requiresGroupOwner
   */
  requiresQuestionOwner(req, res, next) {
    this.requiresLogin(req, res, err => {
      if (err) return next(err);

      Question
        .read(req.body.questionId || req.params.id)
        .pluck('userId')
        .execute((err, question) => {
          if (err || !question) return next(new Errors.NotFoundError());
          return question.userId === req.userId ? next() : next(new Errors.ForbiddenError());
        });
    });
  }
}

module.exports = new QuestionAuth();
