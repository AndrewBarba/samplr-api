"use strict";

const forky = require('forky');

forky({
  path: __dirname + '/server.js',
  workers: process.env.WEB_CONCURRENCY || 1,
});
