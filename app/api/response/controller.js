"use strict";

const Response = require('modules/response');

/**
 * Answer a response
 *
 * @method update
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.update = (req, res, next) => {

  let responseId = req.params.id;
  let value = req.body.value;

  Response.complete(responseId, value, (err, response) => {
    if (err) return next(err);
    res.status(200).json(response);
  });
};
