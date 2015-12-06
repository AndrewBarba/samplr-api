"use strict";

const async = require('async');
const swagger = require('swagger-node-express');
const controller = require('./controller');
const validator = require('./validator');
const auth = require('./authorization');

swagger.addPost({
  spec: {
    path: "/auth/register",
    summary: "Register a new user",
    method: "POST",
    type: "Register",
    nickname: "register",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => validator.validateRegister(req, res, done),
      done => controller.register(req, res, done)
    ], next);
  }
});

swagger.addPost({
  spec: {
    path: "/auth/register/client",
    summary: "Register a new client user",
    method: "POST",
    type: "Register Client",
    nickname: "registerClient",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => auth.requiresResearcherLogin(req, res, done),
      done => validator.validateRegister(req, res, done),
      done => controller.registerClient(req, res, done)
    ], next);
  }
});

swagger.addPost({
  spec: {
    path: "/auth/login",
    summary: "Login a user",
    method: "POST",
    type: "Login",
    nickname: "login",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    async.series([
      done => validator.validateLogin(req, res, done),
      done => controller.login(req, res, done)
    ], next);
  }
});

swagger.configureDeclaration('auth', {
  description: 'Authentication',
  authorizations: ['apiKey'],
  produces: ['application/json']
});
