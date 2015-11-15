"use strict";

const Model = require('./model');
const Service = require('./service');

const model = new Model("MODULE_NAME_HERE");
const service = new Service(model);

exports = module.exports = service;
