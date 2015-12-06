"use strict";

const Model = require('./model');
const Service = require('./service');

const model = new Model("Response");
const service = new Service(model);

exports = module.exports = service;
exports.STATE = require('./state');
