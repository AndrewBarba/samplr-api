"use strict";

const config = require('config');

/**
 * API status
 *
 * @method status
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.status = (req, res) => {
  res.status(200).json({
    status: 'OK',
    environment: config.env,
    node: process.version,
    database: config.rethinkdb.db
  });
};
