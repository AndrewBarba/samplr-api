"use strict";

const _ = require('underscore');
const async = require('async');
const moment = require('moment');
const Errors = require('app/errors');
const CommonService = require('modules/common').Service;

// Modules
const User = require('modules/user');
const Response = require('modules/response');
const Question = require('modules/question');

// Constants
const SURVEY_TIME = require('./time');

class SurveyService extends CommonService {

  /**
   * Create a new survey
   *
   * @method create
   * @param {Object} options
   * @param {String} options.groupId
   * @param {String} options.name
   * @param {Function} next
   */
  create(options, next) {
    if (!options) return next(new Errors.InvalidArgumentError("SurveyService.create - options is required"));
    if (!options.userId) return next(new Errors.InvalidArgumentError("SurveyService.create - options.userId is required"));
    if (!options.groupId) return next(new Errors.InvalidArgumentError("SurveyService.create - options.groupId is required"));
    if (!options.name) return next(new Errors.InvalidArgumentError("SurveyService.create - options.name is required"));

    return super.create(options, next);
  }

  /**
   * List surveys by group id
   *
   * @method listByGroupId
   * @param {String} groupId
   * @param {Function} next
   */
  listByGroupId(groupId, next) {
    return this.listIndex("groupId", groupId, next);
  }

  /**
   * List surveys by user id
   *
   * @method listByUserId
   * @param {String} userId
   * @param {Function} next
   */
  listByUserId(userId, next) {
    return this.listIndex("userId", userId, next);
  }

  /**
   * Adds a user to a group
   *
   * @method addUser
   * @param {String} groupId
   * @param {String} userId
   * @param {Date} start
   * @param {Date} end
   * @param {Function} next
   */
  addUser(surveyId, userId, start, end, next) {
    async.auto({
      survey: done => {
        this.read(surveyId, done);
      },
      user: done => {
        User.read(userId, done);
      },
      responses: ['survey', 'user', (done, results) => {
        this._generateResponses(results.survey, results.user, start, end, done);
      }]
    }, (err, results) => {
      if (err) return next(err);

      let survey = results.survey;

      survey.users = [results.user];

      survey
        .saveAll({ users: true })
        .then(res => next(null, res))
        .catch(err => next(err));
    });
  }

  /**
   * Create resposnes for user to answer
   *
   * @method _generateResponses
   * @param {Survey} survey
   * @param {User} user
   * @param {Integer} days
   * @param {Function} next
   */
  _generateResponses(survey, user, start, end, next) {
    async.waterfall([
      done => {
        Question.listBySurveyId(survey.id, done);
      },
      (questions, done) => {
        let responses = _generateResponses(survey, user, start, end, questions);
        Response
          .model
          .save(responses)
          .then(res => done(null, res))
          .catch(err => done(err));
      }
    ], next);
  }
}

function _generateResponses(survey, user, start, end, questions) {
  start = moment(start).startOf('day');
  end = moment(end).startOf('day');

  let date = moment(start);
  let responses = [];

  do {
    _.each(questions, question => {
      _.each(survey.schedule, schedule => {
        responses.push({
          date: _responseDate(date, schedule.time),
          userId: user.id,
          surveyId: survey.id,
          questionId: question.id
        });
      });
    });

    date = date.add(1, 'days');
  } while (date.isBefore(end));

  return responses;
}

function _responseDate(date, time) {
  date = moment(date).startOf('day');

  switch (time) {
    case SURVEY_TIME.SUNRISE:
      date = date.set('hour', 6);
      break;
    case SURVEY_TIME.MORNING:
      date = date.set('hour', 9);
      break;
    case SURVEY_TIME.NOON:
      date = date.set('hour', 12);
      break;
    case SURVEY_TIME.SUNSET:
      date = date.set('hour', 7);
      break;
    case SURVEY_TIME.NIGHT:
      date = date.set('hour', 10);
      break;
  }

  return date.toDate();
}

module.exports = SurveyService;
