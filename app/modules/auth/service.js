"use strict";

const async = require('async');
const bcrypt = require('bcrypt');
const Errors = require('app/errors');
const CommonService = require('modules/common').Service;

// Modules
const User = require('modules/user');

// Constants
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 64;
const SALT_WORK_FACTOR = 10;

class AuthService extends CommonService {

  /**
   * Read auth by token
   *
   * @method readByToken
   * @param {String} token
   * @param {Function} next
   */
  readByToken(token, next) {
    return this.readIndex("token", token, next);
  }

  /**
   * Read auth by user id
   *
   * @method readByUserId
   * @param {String} userId
   * @param {Function} next
   */
  readByUserId(userId, next) {
    return this.readIndex("userId", userId, next);
  }

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
   * @param {Function} next
   */
  register(options, next) {
    if (!options) return next(new Errors.InvalidArgumentError("AuthService.register - options is required"));
    if (!options.email) return next(new Errors.InvalidArgumentError("AuthService.register - options.email is required"));
    if (!options.password) return next(new Errors.InvalidArgumentError("AuthService.register - options.password is required"));
    if (!options.firstName) return next(new Errors.InvalidArgumentError("AuthService.register - options.firstName is required"));
    if (!options.lastName) return next(new Errors.InvalidArgumentError("AuthService.register - options.lastName is required"));
    if (!options.type) return next(new Errors.InvalidArgumentError("AuthService.register - options.type is required"));

    async.auto({
      // create a new user
      user: (done) => {
        User.create(options, done);
      },
      // hash password
      password: (done) => {
        let password = options.password;
        if (password.length < MIN_PASSWORD_LENGTH) return done(new Errors.InvalidArgumentError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`));
        if (password.length > MAX_PASSWORD_LENGTH) return done(new Errors.InvalidArgumentError(`Password must be ${MAX_PASSWORD_LENGTH} characters or less.`));

        bcrypt.hash(password, SALT_WORK_FACTOR, done);
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
      next(null, sanitizeAuth(auth));
    });
  }

  /**
   * Login an existing user
   *
   * @method register
   * @param {Object} options
   * @param {String} options.email
   * @param {String} options.password
   * @param {Function} next
   */
  login(options, next) {
    if (!options) return next(new Errors.InvalidArgumentError("AuthService.login - options is required"));
    if (!options.email) return next(new Errors.InvalidArgumentError("AuthService.login - options.email is required"));
    if (!options.password) return next(new Errors.InvalidArgumentError("AuthService.login - options.password is required"));

    async.waterfall([
      // get user
      (done) => {
        User.readByEmail(options.email, (err, user) => {
          if (err) return done(err);
          if (!user) return done(new Errors.BadRequestError('User does not exist'));
          done(null, user);
        });
      },
      // get auth
      (user, done) => {
        this
          .readByUserId(user.id)
          .pluck('token', 'password')
          .execute((err, auth) => {
            if (err) return done(err);
            if (!auth[0]) return done(new Errors.BadRequestError('Auth does not exist for this user'));
            done(null, auth[0], user);
          });
      },
      // compare password
      (auth, user, done) => {
        let password = options.password;
        if (password.length < MIN_PASSWORD_LENGTH) return done(new Errors.InvalidArgumentError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`));
        if (password.length > MAX_PASSWORD_LENGTH) return done(new Errors.InvalidArgumentError(`Password must be ${MAX_PASSWORD_LENGTH} characters or less.`));

        bcrypt.compare(password, auth.password, (err, res) => {
          if (err) return done(err);
          if (!res) return done(new Errors.BadRequestError('Password does not match'));
          done(null, auth, user);
        });
      }
    ], (err, auth, user) => {
      if (err) return next(err);
      auth.user = user;
      next(null, sanitizeAuth(auth));
    });
  }
}

function sanitizeAuth(auth) {
  delete auth.password;
  delete auth.userId;
  return auth;
}

module.exports = AuthService;
