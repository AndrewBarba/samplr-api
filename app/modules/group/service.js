"use strict";

const async = require('async');
const Errors = require('app/errors');
const CommonService = require('modules/common').Service;

// Modules
const User = require('modules/user');

class GroupService extends CommonService {

  /**
   * Create a new group
   *
   * @method create
   * @param {Object} options
   * @param {String} options.userId
   * @param {String} options.name
   * @param {Function} next
   */
  create(options, next) {
    if (!options) return next(new Errors.InvalidArgumentError("GroupService.create - options is required"));
    if (!options.userId) return next(new Errors.InvalidArgumentError("GroupService.create - options.userId is required"));
    if (!options.name) return next(new Errors.InvalidArgumentError("GroupService.create - options.name is required"));

    return super.create(options, next);
  }

  /**
   * List groups by user id
   *
   * @method listByUserId
   * @param {String} userId
   * @param {Function} next
   */
  listByUserId(userId, next) {
    return this.listIndex("userId", userId, next);
  }

  /**
   * Adds a user to a group
   *
   * @method listByUserId
   * @param {String} groupId
   * @param {String} userId
   * @param {Function} next
   */
  addUser(groupId, userId, next) {
    async.parallel({
      group: done => {
        this.read(groupId, done);
      },
      user: done => {
        User.read(userId, done);
      }
    }, (err, results) => {
      if (err) return next(err);
      if (!results.user) return next(new Errors.NotFoundError('User not found'));
      if (!results.group) return next(new Errors.NotFoundError('Group not found'));

      let group = results.group;
      let user = results.user;

      group.users = [user];

      group
        .saveAll({ users: true })
        .then(res => next(null, res))
        .catch(err => next(err));
    });
  }
}

module.exports = GroupService;
