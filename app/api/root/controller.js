"use strict";

const config = require('config');

exports.root = (req, res) => {
  res.status(200).json(config.app);
};

exports.status = (req, res) => {
  res.status(200).json({
    status: 'OK',
    environment: config.env,
    node: process.version,
    database: config.rethinkdb.db
  });
};
