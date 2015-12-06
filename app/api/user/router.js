"use strict";

const async = require('async');
const swagger = require('swagger-node-express');
const controller = require('./controller');
const validator = require('./validator');
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

swagger.addGet({
  spec: {
    path: "/user/{id}/response",
    summary: "List responses this user needs to answer",
    method: "GET",
    type: "List Resposnes",
    nickname: "listResponses",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresClientLogin(req, res, done),
      done => auth.requiresCurrentUser(req, res, done),
      done => controller.listResponses(req, res, done)
    ], next);
  }
});

swagger.addGet({
  spec: {
    path: "/user/{id}/user",
    summary: "List my users",
    method: "GET",
    type: "List users",
    nickname: "listUsers",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresCurrentUser(req, res, done),
      done => auth.requiresResearcherLogin(req, res, done),
      done => controller.listUsers(req, res, done)
    ], next);
  }
});

swagger.addPut({
  spec: {
    path: "/user/{id}/push",
    summary: "Add push token for user",
    method: "PUT",
    type: "Add Push Token",
    nickname: "addPush",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresCurrentUser(req, res, done),
      done => validator.validateAddPush(req, res, done),
      done => controller.addPush(req, res, done)
    ], next);
  }
});

swagger.configureDeclaration('user', {
  description: 'User',
  authorizations: ['apiKey'],
  produces: ['application/json']
});
