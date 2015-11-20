"use strict";

const async = require('async');
const swagger = require('swagger-node-express');
const controller = require('./controller');
const validator = require('./validator');
const auth = require('./authorization');

swagger.addPost({
  spec: {
    path: "/group",
    summary: "Register a new user",
    method: "POST",
    type: "Register",
    nickname: "register",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresResearcherLogin(req, res, done),
      done => validator.validateCreate(req, res, done),
      done => controller.create(req, res, done)
    ], next);
  }
});

swagger.configureDeclaration('group', {
  description: 'Group',
  authorizations: ['apiKey'],
  produces: ['application/json']
});
