"use strict";

const Errors = require('app/errors');
const CommonService = require('modules/common').Service;

class SurveyService extends CommonService {

  /**
   * Create a new survey
   *
   * @method create
   * @param {Object} options
   * @param {String} options.groupId
   * @param {String} options.name
   * @param {Function} next
   */
  create(options, next) {
    if (!options) return next(new Errors.InvalidArgumentError("SurveyService.create - options is required"));
    if (!options.groupId) return next(new Errors.InvalidArgumentError("SurveyService.create - options.groupId is required"));
    if (!options.name) return next(new Errors.InvalidArgumentError("SurveyService.create - options.name is required"));

    return super.create(options, next);
  }

  /**
   * List surveys by group id
   *
   * @method listByGroupId
   * @param {String} groupId
   * @param {Function} next
   */
  listByGroupId(groupId, next) {
    return this.listIndex("groupId", groupId, next);
  }
}

module.exports = SurveyService;
