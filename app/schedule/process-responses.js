"use strict";

const _ = require('underscore');
const async = require('async');
const logger = require('logger');

// Modules
const Response = require('modules/response');
const User = require('modules/user');

// Constants
const RESPONSE_STATE = Response.STATE;

async.waterfall([
  done => {
    Response
      .listIndex('state', RESPONSE_STATE.PENDING)
      .filter(res => {
        return res('date').lt(new Date());
      })
      .update({
        state: RESPONSE_STATE.READY
      })
      .run(done);
  },
  (responses, done) => {
    let usersIds = _.chain(responses).pluck('userId').unique().value();
    User.listIndex('id', usersIds, done);
  },
  (users, done) => {
    _.each(users, user => {
      // notify user
      logger.info(user);
    });
    done();
  }
], err => {
  if (err) throw err;

  logger.info('Done! Waiting for notifications...');

  // exit in 30 seconds
  setTimeout(process.exit, 30 * 1000);
});
