"use strict";

const Model = require('./model');
const Service = require('./service');

const model = new Model("Survey");
const service = new Service(model);

exports = module.exports = service;
exports.TIME = require('./time');
exports.STATE = require('./state');
