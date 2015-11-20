
"use strict";

const User = require('modules/user');

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
