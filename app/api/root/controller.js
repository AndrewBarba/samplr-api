"use strict";

const config = require('config');

/**
 * API root
 *
 * @method root
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.root = (req, res) => {
  res.status(200).json(config.app);
};
