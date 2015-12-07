"use strict";

const Question = require('modules/question');
const Response = require('modules/response');

// Constants
const RESPONSE_STATE = Response.STATE;

/**
 * Create a new question
 *
 * @method create
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.create = (req, res, next) => {

  let userId = req.userId;
  let surveyId = req.body.surveyId;
  let title = req.body.title;
  let responses = req.body.responses;

  Question.create({
    userId: userId,
    surveyId: surveyId,
    title: title,
    responses: responses
  }, (err, question) => {
    if (err) return next(err);
    res.status(201).json(question);
  });
};

/**
 * Update a question
 *
 * @method create
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.update = (req, res, next) => {

  let questionId = req.params.id;
  let title = req.body.title;

  Question.readAndUpdate(questionId, {
    title: title
  }, (err, question) => {
    if (err) return next(err);
    res.status(200).json(question);
  });
};

/**
 * List responses for this question
 *
 * @method listResponses
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.listResponses = (req, res, next) => {

  let questionId = req.params.id;
  let state = req.params.state || RESPONSE_STATE.COMPLETE;

  Response
    .listByQuestionId(questionId, state)
    .run((err, resposnes) => {
      if (err) return next(err);
      res.status(200).json(resposnes);
    });
};
