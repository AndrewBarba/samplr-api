"use strict";

const async = require('async');
const swagger = require('swagger-node-express');
const controller = require('./controller');
const validator = require('./validator');
const auth = require('./authorization');
const groupAuth = require('../group/authorization');

swagger.addGet({
  spec: {
    path: "/survey/{id}",
    summary: "Get a survey",
    method: "GET",
    type: "Read",
    nickname: "read",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresSurveyOwner(req, res, done),
      done => controller.read(req, res, done)
    ], next);
  }
});

swagger.addPost({
  spec: {
    path: "/survey",
    summary: "Create a new survey",
    method: "POST",
    type: "Create",
    nickname: "create",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => groupAuth.requiresGroupOwner(req, res, done),
      done => validator.validateCreate(req, res, done),
      done => controller.create(req, res, done)
    ], next);
  }
});

swagger.addPut({
  spec: {
    path: "/survey/{id}",
    summary: "Update a survey",
    method: "PUT",
    type: "Update",
    nickname: "update",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresSurveyOwner(req, res, done),
      done => validator.validateUpdate(req, res, done),
      done => controller.update(req, res, done)
    ], next);
  }
});

swagger.addPut({
  spec: {
    path: "/survey/{id}/user",
    summary: "Add a user to survey",
    method: "PUT",
    type: "Add User",
    nickname: "addUser",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresSurveyOwner(req, res, done),
      done => validator.validateAddUser(req, res, done),
      done => controller.addUser(req, res, done)
    ], next);
  }
});

swagger.addGet({
  spec: {
    path: "/survey/{id}/question",
    summary: "List questions for a survey",
    method: "GET",
    type: "List Questions",
    nickname: "listQuestions",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresSurveyOwner(req, res, done),
      done => controller.listQuestions(req, res, done)
    ], next);
  }
});

swagger.addGet({
  spec: {
    path: "/survey/{id}/response",
    summary: "List responses for a survey",
    method: "GET",
    type: "List Responses",
    nickname: "listResponses",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresSurveyOwner(req, res, done),
      done => controller.listResponses(req, res, done)
    ], next);
  }
});

swagger.addGet({
  spec:{
    path: "/survey/{id}/response/csv",
    summary: "Get CSV of survey responses",
    method: "GET",
    type: "Get CSV",
    nickname: "getCSV",
    produces: ["text/csv"]
  },
action: (req,res,next) => {
    async.series([
        done => auth.requiresSurveyOwner(req, res, done),
        done => controller.getCSV(req, res, done);
    ], next);
  }
});

swagger.configureDeclaration('survey', {
  description: 'Survey',
  authorizations: ['apiKey'],
  produces: ['application/json']
});
