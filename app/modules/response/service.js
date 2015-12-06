"use strict";

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
   * List responses by survey id
   *
   * @method listByUserId
   * @param {String} userId
   * @param {Function} next
   */
  listBySurveyId(surveyId, state, next) {
    if (arguments.length === 2) {
      next = state;
      state = RESPONSE_STATE.COMPLETE;
    }
    return this
      .listIndex("surveyId", surveyId)
      .filter({
        state: state
      })
      .run(next);
}


/**
   * gets a CSV formatted object with responses from a survey id
   *
   * @method getCSV
   * @param {String} surveyID
   * @param {Function} next
   */
  getCSV(surveyId, state, next) {
    if (arguments.length === 2) {
        next = state;
        state = RESPONSE_STATE.COMPLETE;
    }    
    return this    //r.db("development").table("Response").eqJoin("userId", r.db("development").table("User"))
      .listIndex("surveyId", surveyId)
      .getJoin("userId")
      .filter({
          state: state          
        })
        .run(next);
}

  /**
   * List responses by question id
   *
   * @method listByUserId
   * @param {String} userId
   * @param {Function} next
   */
  listByQuestionId(questionId, state, next) {
    if (arguments.length === 2) {
      next = state;
      state = RESPONSE_STATE.COMPLETE;
    }

    return this
      .listIndex("questionId", questionId)
      .filter({
        state: state
      })
      .run(next);
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
      state = RESPONSE_STATE.READY;
    }

    return this
      .listIndex("userId", userId)
      .filter({
        state: state
      })
      .run(next);
  }
}

module.exports = ResponseService;
