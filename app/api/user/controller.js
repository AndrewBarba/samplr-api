
"use strict";

const User = require('modules/user');
const Group = require('modules/group');

/**
 * Get current user
 *
 * @method create
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.me = (req, res, next) => {

  let userId = req.userId;

  User.read(userId, (err, user) => {
    if (err) return next(err);
    res.status(200).json(user);
  });
};

/**
 * List groups for this user
 *
 * @method listGroups
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.listGroups = (req, res, next) => {

  let userId = req.userId;

  Group.listByUserId(userId, (err, groups) => {
    if (err) return next(err);
    res.status(200).json(groups);
  });
};

/**
 * Search for a user
 *
 * @method search
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.search = (req, res, next) => {

  let userId = req.userId;
  let query = req.query.query;

  User.search(userId, query, (err, users) => {
    if (err) return next(err);
    res.status(200).json(users);
  });
};

/**
 * Add a push token to a user
 *
 * @method addPush
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.addPush = (req, res, next) => {

  let userId = req.params.id;
  let push = {
    token: req.body.token,
    type: req.body.type
  };

  User.readAndUpdate(userId, {
    push: push
  }, (err, group) => {
    if (err) return next(err);
    res.status(200).json(group);
  });
};
