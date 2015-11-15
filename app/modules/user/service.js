"use strict";

const Errors = require('app/errors');
const CommonService = require('modules/common').Service;

class UserService extends CommonService {

  /**
   * Create a new user
   *
   * @method create
   * @param {Object} options
   * @param {String} options.email
   * @param {String} options.firstName
   * @param {String} options.lastName
   * @param {Number} [options.age]
   */
  create(options, next) {
    if (!options) return next(new Errors.InvalidArgumentError("AuthService.register - options is required"));
    if (!options.email) return next(new Errors.InvalidArgumentError("AuthService.register - options.email is required"));
    if (!options.firstName) return next(new Errors.InvalidArgumentError("AuthService.register - options.firstName is required"));
    if (!options.lastName) return next(new Errors.InvalidArgumentError("AuthService.register - options.lastName is required"));

    this.readIndex("email", options.email, (err, user) => {
      if (err) return next(err);
      if (user) return next(new Errors.BadRequestError('User already exists with this email address'));

      super.create({
        email: options.email,
        firstName: options.firstName,
        lastName: options.lastName,
        age: options.age
      }, next);
    });
  }
}

module.exports = UserService;
