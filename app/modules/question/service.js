"use strict";

const Errors = require('app/errors');
const CommonService = require('modules/common').Service;

class QuestionService extends CommonService {

  /**
   * Create a new survey
   *
   * @method create
   * @param {Object} options
   * @param {String} options.surveyId
   * @param {String} options.name
   * @param {Function} next
   */
  create(options, next) {
    if (!options) return next(new Errors.InvalidArgumentError("QuestionService.create - options is required"));
    if (!options.userId) return next(new Errors.InvalidArgumentError("QuestionService.create - options.userId is required"));
    if (!options.surveyId) return next(new Errors.InvalidArgumentError("QuestionService.create - options.surveyId is required"));
    if (!options.title) return next(new Errors.InvalidArgumentError("QuestionService.create - options.title is required"));

    return super.create(options, next);
  }

  /**
   * List questions by survey id
   *
   * @method listBySurveyId
   * @param {String} surveyId
   * @param {Function} next
   */
  listBySurveyId(surveyId, next) {
    return this.listIndex("surveyId", surveyId, next);
  }
}

module.exports = QuestionService;
