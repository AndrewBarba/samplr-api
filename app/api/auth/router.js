"use strict";

const swagger = require('swagger-node-express');
const controller = require('./controller');
const validator = require('./validator');

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
    validator.validateRegister(req, res, err => {
      if (err) return next(err);
      controller.register(req, res, next);
    });
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
    validator.validateLogin(req, res, err => {
      if (err) return next(err);
      controller.login(req, res, next);
    });
  }
});

swagger.configureDeclaration('auth', {
  description: 'Authentication',
  authorizations: ['apiKey'],
  produces: ['application/json']
});
