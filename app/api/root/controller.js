"use strict";

const config = require('config');

exports.root = (req, res) => {
  res.status(200).json(config.app);
};
