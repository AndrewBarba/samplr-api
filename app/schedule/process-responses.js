"use strict";

const _ = require('underscore');
const async = require('async');
const logger = require('logger');
const push = require('lib/push');

// Modules
const Response = require('modules/response');
const User = require('modules/user');

// Constants
const MESSAGE = 'Hey, you have a new survey ready to answer!';

async.waterfall([
  done => {
    Response.processByDate(new Date(), done);
  },
  (responses, done) => {
    logger.info(`Processed ${responses.length} responses`);
    let usersIds = _.chain(responses).pluck('userId').unique().value();
    User.listIndex('id', usersIds, done);
  },
  (users, done) => {
    _.each(users, user => {
      if (!user.push || !user.push.token) return;
      logger.info('Sending push to user', user.id, user.firstName, user.lastName);
      push.send(MESSAGE, user.push.token, user.push.type);
    });
    done();
  }
], err => {
  if (err) throw err;

  logger.info('Done! Waiting for notifications...');

  // exit in 30 seconds
  setTimeout(process.exit, 30 * 1000);
});
