"use strict";

const moment = require('moment');
const logger = require('logger');

// Modules
const Response = require('modules/response');

// Expire anything 30 minutes old
let date = moment().subtract(30, 'minutes').toDate();

Response.expireByDate(date, (err, results) => {
  if (err) throw err;
  logger.info(`Expired ${results.length} responses`);
  process.exit(0);
});
