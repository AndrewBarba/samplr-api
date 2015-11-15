"use strict";

const async = require('async');
const bcrypt = require('bcryptjs');
const Errors = require('app/errors');
const CommonService = require('modules/common').Service;

// Modules
const User = require('modules/user');

// Constants
const SALT_WORK_FACTOR = 10;

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

    async.auth({
      // create a new user
      user: (done) => {
        User.create(options, done);
      },
      // hash password
      password: (done) => {
        bcrypt.hash(options.password, SALT_WORK_FACTOR, done);
      },
      // create auth
      auth: ['user', 'password', (done, results) => {
        this.create({
          userId: results.user.id,
          password: results.password
        }, done);
      }]
    }, (err, results) => {
      if (err) return next(err);

      let auth = results.auth;
      auth.user = results.user;

      next(null, auth);
    });
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
