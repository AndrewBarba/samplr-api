"use strict";

const Errors = require('app/errors');
const CommonService = require('modules/common').Service;

class UserService extends CommonService {

  /**
   * Read a user by their email address
   *
   * @method readByEmail
   */
  readByEmail(email, next) {
    return this.readIndex("email", email.toLowerCase(), next);
  }

  /**
   * Create a new user
   *
   * @method create
   * @param {Object} options
   * @param {String} options.email
   * @param {String} options.firstName
   * @param {String} options.lastName
   * @param {String} options.type
   * @param {Number} [options.age]
   * @param {Function} next
   */
  create(options, next) {
    if (!options) return next(new Errors.InvalidArgumentError("UserService.create - options is required"));
    if (!options.email) return next(new Errors.InvalidArgumentError("UserService.create - options.email is required"));
    if (!options.firstName) return next(new Errors.InvalidArgumentError("UserService.create - options.firstName is required"));
    if (!options.lastName) return next(new Errors.InvalidArgumentError("UserService.create - options.lastName is required"));
    if (!options.type) return next(new Errors.InvalidArgumentError("UserService.create - options.type is required"));

    this.readIndex("email", options.email, (err, user) => {
      if (err) return next(err);
      if (user) return next(new Errors.BadRequestError('User already exists with this email address'));

      super.create({
        email: options.email.toLowerCase(),
        firstName: options.firstName,
        lastName: options.lastName,
        age: options.age,
        type: options.type,
        userId: options.userId
      }, next);
    });
  }

  /**
   * List users by user id
   *
   * @method listByUserId
   * @param {String} userId
   * @param {Function} next
   */
  listByUserId(userId, next) {
    return this.listIndex("userId", userId, next);
  }

  /**
   * List users by survey id
   *
   * @method listBySurveyId
   * @param {String} userId
   * @param {Function} next
   */
  listBySurveyId(surveyId, next) {
    let Survey = require('modules/survey');

    let r = Survey
      .read(surveyId)
      .getJoin({
        users: true
      });

    return this.rQuery(r, (err, survey) => {
      if (err) return next(err);
      next(null, survey.users);
    });
  }

  /**
   * Search for a user
   *
   * @method search
   * @param {String} userId
   * @param {String} query
   * @param {Function} next
   */
  search(userId, query, next) {

    let op = this.listByUserId(userId);
    let parts = query.split(" ");

    if (query.indexOf('@') >= 0) {
      op = op.filter(user => {
        return user("email").match(`(?i)${query}`);
      });
    } else if (parts.length === 1) {
      op = op.filter(user => {
        return user("firstName").match(`(?i)${parts[0]}`);
      });
    } else {
      op = op.filter(user => {
        return user("firstName")
          .match(`(?i)${parts[0]}`)
          .or(user("lastName").match(`(?i)${parts[1]}`));
      });
    }

    op.run(next);
  }
}

module.exports = UserService;
