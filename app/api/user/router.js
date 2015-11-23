"use strict";

const async = require('async');
const swagger = require('swagger-node-express');
const controller = require('./controller');
const auth = require('./authorization');

swagger.addGet({
  spec: {
    path: "/me",
    summary: "Get current user",
    method: "GET",
    type: "Current",
    nickname: "current",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresLogin(req, res, done),
      done => controller.me(req, res, done)
    ], next);
  }
});

swagger.addGet({
  spec: {
    path: "/user/{id}/group",
    summary: "List groups this user owns",
    method: "GET",
    type: "List Groups",
    nickname: "listGroups",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresResearcherLogin(req, res, done),
      done => auth.requiresCurrentUser(req, res, done),
      done => controller.listGroups(req, res, done)
    ], next);
  }
});

swagger.configureDeclaration('user', {
  description: 'User',
  authorizations: ['apiKey'],
  produces: ['application/json']
});
