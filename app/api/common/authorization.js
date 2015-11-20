"use strict";

const _ = require('underscore');
const Errors = require('app/errors');

// Modules
const Auth = require('modules/auth');
const User = require('modules/user');

// Constants
const USER_TYPE = User.TYPE;
const AUTH_HEADER_KEY = 'x-access-token';

class CommonAuth {

  /**
   * Requires a valid user auth token
   *
   * @method requiresLogin
   */
  requiresLogin(req, res, next) {
    let token = req.headers[AUTH_HEADER_KEY];
    if (!token || !_.isString(token)) return next(new Errors.UnauthorizedError());

    Auth.readByToken(token, (err, auth) => {
      if (err || !auth) return next(new Errors.UnauthorizedError());
      req.userId = auth.userId;
      next();
    });
  }

  /**
   * Requires a valid client auth token
   *
   * @method requiresClientLogin
   */
  requiresClientLogin(req, res, next) {
    this.requiresLogin(req, res, err => {
      if (err) return next(err);

      User
        .read(req.userId)
        .pluck('type')
        .run((err, user) => {
          if (err || !user) return next(new Errors.UnauthorizedError());
          if (user.type !== USER_TYPE.CLIENT) return next(new Errors.UnauthorizedError());
          next();
        });
    });
  }

  /**
   * Requires a valid researcher auth token
   *
   * @method requiresResearcherLogin
   */
  requiresResearcherLogin(req, res, next) {
    this.requiresLogin(req, res, err => {
      if (err) return next(err);

      User
        .read(req.userId)
        .pluck('type')
        .run((err, user) => {
          if (err || !user) return next(new Errors.UnauthorizedError());
          if (user.type !== USER_TYPE.RESEARCHER) return next(new Errors.UnauthorizedError());
          next();
        });
    });
  }

  /**
   * Requires a valid auth token and logged in user
   * must be the same as the user id in the url
   *
   * @method requiresCurrentUser
   */
  requiresCurrentUser(req, res, next) {
    this.requiresLogin(req, res, err => {
      if (err) return next();
      if (req.params.id !== req.userId) return next(new Errors.UnauthorizedError());
      next();
    });
  }
}

module.exports = CommonAuth;
