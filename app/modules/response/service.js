"use strict";

const async = require('async');
const Errors = require('app/errors');
const CommonService = require('modules/common').Service;

// Constants
const RESPONSE_STATE = require('./state');

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

  /**
   * Complete a response
   *
   * @method complete
   * @param {String} responseId
   * @param {Number} value
   * @param {Function} next
   */
  complete(responseId, value, next) {
    return this.readAndUpdate(responseId, {
      state: RESPONSE_STATE.COMPLETE,
      value: value
    }, next);
  }

  /**
   * Bulk complete responses
   *
   * @method bulkComplete
   * @param {[Object]} responses
   * @param {Function} next
   */
  bulkComplete(responses, next) {
    async.map(responses, (response, done) => {
      this.complete(response.id, response.value, done);
    }, next);
  }

  /**
   * List responses by survey id
   *
   * @method listBySurveyId
   * @param {String} userId
   * @param {Function} next
   */
  listBySurveyId(surveyId, state, next) {
    if (arguments.length === 2) {
      next = state;
      state = null;
    }
    state = state || RESPONSE_STATE.COMPLETE;

    let r = this
      .listIndex("surveyId", surveyId)
      .filter({
        state: state
      });

    return this.rQuery(r, next);
  }

  /**
   * List responses by question id
   *
   * @method listByQuestionId
   * @param {String} userId
   * @param {Function} next
   */
  listByQuestionId(questionId, state, next) {
    if (arguments.length === 2) {
      next = state;
      state = null;
    }
    state = state || RESPONSE_STATE.COMPLETE;

    let r = this
      .listIndex("questionId", questionId)
      .filter({
        state: state
      });

    return this.rQuery(r, next);
  }

  /**
   * List responses by user id
   *
   * @method listByUserId
   * @param {String} userId
   * @param {Function} next
   */
  listByUserId(userId, state, next) {
    if (arguments.length === 2) {
      next = state;
      state = null;
    }
    state = state || RESPONSE_STATE.READY;

    let r = this
      .listIndex("userId", userId)
      .filter({
        state: state
      });

    return this.rQuery(r, next);
  }
}

module.exports = ResponseService;
