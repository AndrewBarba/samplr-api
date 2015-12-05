"use strict";

const async = require('async');
const swagger = require('swagger-node-express');
const controller = require('./controller');
const validator = require('./validator');
const auth = require('./authorization');

swagger.addPost({
  spec: {
    path: "/group",
    summary: "Create a new group",
    method: "POST",
    type: "Create",
    nickname: "create",
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

swagger.addPut({
  spec: {
    path: "/group/{id}",
    summary: "Update a group",
    method: "PUT",
    type: "Update",
    nickname: "update",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresGroupOwner(req, res, done),
      done => validator.validateUpdate(req, res, done),
      done => controller.update(req, res, done)
    ], next);
  }
});

swagger.addPut({
  spec: {
    path: "/group/{id}/user",
    summary: "Add a user to a group",
    method: "PUT",
    type: "Add User",
    nickname: "addUser",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresGroupOwner(req, res, done),
      done => validator.validateAddUser(req, res, done),
      done => controller.addUser(req, res, done)
    ], next);
  }
});

swagger.addGet({
  spec: {
    path: "/group/{id}/survey",
    summary: "List surveys for a group",
    method: "GET",
    type: "List Surveys",
    nickname: "listSurveys",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresGroupOwner(req, res, done),
      done => controller.listSurveys(req, res, done)
    ], next);
  }
});

swagger.configureDeclaration('group', {
  description: 'Group',
  authorizations: ['apiKey'],
  produces: ['application/json']
});
