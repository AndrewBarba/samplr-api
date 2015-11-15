"use strict";

const swagger = require('swagger-node-express');
const controller = require('./controller');

swagger.addPost({
  spec: {
    path: "/auth/register",
    summary: "Register a new user",
    method: "POST",
    type: "Register",
    nickname: "register",
    produces: ["application/json"]
  },
  action: function(req, res, next) {
    controller.register(req, res, next);
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
  action: function(req, res, next) {
    controller.login(req, res, next);
  }
});

swagger.configureDeclaration('auth', {
  description: 'Authentication',
  authorizations: ['apiKey'],
  produces: ['application/json']
});
