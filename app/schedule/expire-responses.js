"use strict";

const moment = require('moment');
const logger = require('logger');

// Modules
const Response = require('modules/response');

// Constants
const RESPONSE_STATE = Response.STATE;

// Expire anything 20 minutes old
let date = moment().subtract(20, 'minutes').toDate();

Response
  .listIndex('state', RESPONSE_STATE.READY)
  .filter(res => {
    return res('date').lt(date);
  })
  .update({
    state: RESPONSE_STATE.EXPIRED
  })
  .run((err, results) => {
    if (err) throw err;
    logger.info(`Expired ${results.length} responses`);
    process.exit(0);
  });
