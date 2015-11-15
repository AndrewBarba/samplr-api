"use strict";

const Model = require('./model');
const Service = require('./service');

const model = new Model("Template");
const service = new Service(model);

exports = module.exports = service;
