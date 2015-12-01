"use strict";

const Errors = require('app/errors');
const CommonService = require('modules/common').Service;

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
}

module.exports = GroupService;
