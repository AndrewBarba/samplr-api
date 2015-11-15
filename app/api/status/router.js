"use strict";

const swagger = require('swagger-node-express');
const controller = require('./controller');

swagger.addGet({
  spec: {
    path: "/status",
    summary: "Get API status",
    method: "GET",
    type: "Status",
    nickname: "status",
    produces: ["application/json"]
  },
  action: function(req, res, next) {
    controller.status(req, res, next);
  }
});

swagger.configureDeclaration('status', {
  description: 'Status',
  authorizations: ['apiKey'],
  produces: ['application/json']
});
