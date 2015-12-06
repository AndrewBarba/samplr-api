"use strict";

const Survey = require('modules/survey');
const Question = require('modules/question');

/**
 * Create a new survey
 *
 * @method create
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.create = (req, res, next) => {

  let userId = req.userId;
  let groupId = req.body.groupId;
  let name = req.body.name;
  let schedule = req.body.schedule;

  Survey.create({
    userId: userId,
    groupId: groupId,
    name: name,
    schedule: schedule
  }, (err, survey) => {
    if (err) return next(err);
    res.status(201).json(survey);
  });
};

/**
 * Update a survey
 *
 * @method create
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.update = (req, res, next) => {

  let surveyId = req.params.id;
  let name = req.body.name;

  Survey.readAndUpdate(surveyId, {
    name: name
  }, (err, survey) => {
    if (err) return next(err);
    res.status(200).json(survey);
  });
};

/**
 * List questions for a survey
 *
 * @method listSurveys
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.listQuestions = (req, res, next) => {

  let surveyId = req.params.id;

  Question.listBySurveyId(surveyId, (err, questions) => {
    if (err) return next(err);
    res.status(200).json(questions);
  });
};

/**
 * Adds a user to a survey
 *
 * @method addUser
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.addUser = (req, res, next) => {

  let surveyId = req.params.id;
  let userId = req.body.userId;
  let start = new Date(req.body.start);
  let end = new Date(req.body.end);

  Survey.addUser(surveyId, userId, start, end, (err, survey) => {
    if (err) return next(err);
    res.status(201).json(survey);
  });
};
