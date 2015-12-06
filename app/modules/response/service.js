"use strict";

const Errors = require('app/errors');
const CommonService = require('modules/common').Service;

class ResponseService extends CommonService {

  /**
   * Create a new response
   *
   * @method create
   * @param {Object} options
   * @param {Date} options.date
   * @param {String} options.userId
   * @param {String} options.questionId
   * @param {String} options.surveyId
   * @param {Function} next
   */
  create(options, next) {
    if (!options) return next(new Errors.InvalidArgumentError("SurveyService.create - options is required"));
    if (!options.date) return next(new Errors.InvalidArgumentError("SurveyService.create - options.date is required"));
    if (!options.userId) return next(new Errors.InvalidArgumentError("SurveyService.create - options.userId is required"));
    if (!options.questionId) return next(new Errors.InvalidArgumentError("SurveyService.create - options.questionId is required"));
    if (!options.surveyId) return next(new Errors.InvalidArgumentError("SurveyService.create - options.surveyId is required"));

    return super.create(options, next);
  }
}

module.exports = ResponseService;
