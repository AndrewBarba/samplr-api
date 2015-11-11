"use strict";

const forky = require('forky');

forky({
  path: __dirname + '/server.js',
  workers: process.env.THREADS || 1,
  enable_logging: true
});
