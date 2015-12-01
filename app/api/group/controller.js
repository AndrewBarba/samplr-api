"use strict";

const Group = require('modules/group');
const Survey = require('modules/survey');

/**
 * Create a new group
 *
 * @method create
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.create = (req, res, next) => {

  let userId = req.userId;
  let name = req.body.name;

  Group.create({
    userId: userId,
    name: name
  }, (err, group) => {
    if (err) return next(err);
    res.status(201).json(group);
  });
};

/**
 * Update a group
 *
 * @method update
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.update = (req, res, next) => {

  let groupId = req.params.id;
  let name = req.body.name;

  Group.readAndUpdate(groupId, {
    name: name
  }, (err, group) => {
    if (err) return next(err);
    res.status(200).json(group);
  });
};

/**
 * List surveys for a group
 *
 * @method listSurveys
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.listSurveys = (req, res, next) => {

  let groupId = req.params.id;

  Survey.listByGroupId(groupId, (err, surveys) => {
    if (err) return next(err);
    res.status(200).json(surveys);
  });
};
