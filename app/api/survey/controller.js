"use strict";

const Survey = require('modules/survey');

/**
 * Create a new survey
 *
 * @method create
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.create = (req, res, next) => {

  let groupId = req.body.groupId;
  let name = req.body.name;

  Survey.create({
    groupId: groupId,
    name: name
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
