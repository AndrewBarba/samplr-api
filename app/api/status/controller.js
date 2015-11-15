"use strict";

const config = require('config');

exports.status = (req, res) => {
  res.status(200).json({
    status: 'OK',
    environment: config.env,
    node: process.version,
    database: config.rethinkdb.db
  });
};
