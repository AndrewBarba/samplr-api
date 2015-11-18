"use strict";

const swagger = require('swagger-node-express');
const controller = require('./controller');

swagger.addGet({
  spec: {
    path: "/",
    summary: "Get root",
    method: "GET",
    type: "Root",
    nickname: "root",
    produces: ["application/json"]
  },
  action: (req, res, next) => {
    controller.root(req, res, next);
  }
});

swagger.configureDeclaration('root', {
  description: 'Root',
  produces: ['application/json']
});
