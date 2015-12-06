"use strict";

const Model = require('./model');
const Service = require('./service');

const model = new Model("User");
const service = new Service(model);

exports = module.exports = service;
exports.TYPE = require('./type');
