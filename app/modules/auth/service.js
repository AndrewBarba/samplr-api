"use strict";

const Errors = require('app/errors');
const CommonService = require('modules/common').Service;

class AuthService extends CommonService {

  /**
   * Register a new user
   *
   * @method register
   * @param {Object} options
   * @param {String} options.email
   * @param {String} options.password
   * @param {String} options.firstName
   * @param {String} options.lastName
   * @param {Number} [options.age]
   */
  register(options, next) {
    if (!options) return next(new Errors.InvalidArgumentError("AuthService.register - options is required"));
    if (!options.email) return next(new Errors.InvalidArgumentError("AuthService.register - options.email is required"));
    if (!options.password) return next(new Errors.InvalidArgumentError("AuthService.register - options.password is required"));
    if (!options.firstName) return next(new Errors.InvalidArgumentError("AuthService.register - options.firstName is required"));
    if (!options.lastName) return next(new Errors.InvalidArgumentError("AuthService.register - options.lastName is required"));

    next(new Errors.BadRequestError('Not implemented'));
  }

  /**
   * Login an existing user
   *
   * @method register
   * @param {Object} options
   * @param {String} options.email
   * @param {String} options.password
   */
  login(options, next) {
    if (!options) return next(new Errors.InvalidArgumentError("AuthService.login - options is required"));
    if (!options.email) return next(new Errors.InvalidArgumentError("AuthService.login - options.email is required"));
    if (!options.password) return next(new Errors.InvalidArgumentError("AuthService.login - options.password is required"));

    next(new Errors.BadRequestError('Not implemented'));
  }
}

module.exports = AuthService;
