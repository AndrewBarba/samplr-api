"use strict";

const Question = require('modules/question');

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
