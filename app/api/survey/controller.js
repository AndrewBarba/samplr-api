"use strict";

const Survey = require('modules/survey');
const Question = require('modules/question');
const Response = require('modules/response');

/**
 * Get a survey
 *
 * @method read
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.read = (req, res, next) => {

  let surveyId = req.params.id;

  Survey.read(surveyId, (err, survey) => {
    if (err) return next(err);
    res.status(200).json(survey);
  });
};

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
 * List responses for this survey
 *
 * @method listResponses
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.listResponses = (req, res, next) => {

  let surveyId = req.params.id;

  Response.listBySurveyId(surveyId, (err, resposnes) => {
    if (err) return next(err);
    res.status(200).json(resposnes);
  });
};

/**
 * gets a CSV of responses on a survey givemn a survey ID
 * 
 * @mthod getCSV
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
exports.getCSV = (req,res,next) =>{
  let surveyId = req.params.id;
  
  Response.getCSV(surveyId, (err, responses) => {
    if(err) return next(err);
    res.status(200).json(responses);
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
