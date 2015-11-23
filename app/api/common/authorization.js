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
    let token = req.headers[AUTH_HEADER_KEY] || req.query.auth;
    if (!token || !_.isString(token)) return next(new Errors.UnauthorizedError());

    Auth
      .readByToken(token)
      .pluck('userId')
      .execute((err, auth) => {
        if (err || !auth[0]) return next(new Errors.UnauthorizedError());
        req.userId = auth[0].userId;
        next();
      });
  }

  /**
   * Requires a valid auth token and logged in user
   * must be the same as the user id in the url
   *
   * @method requiresCurrentUser
   */
  requiresCurrentUser(req, res, next) {
    if (req.userId) {
      return req.params.id === req.userId ? next() : next(new Errors.UnauthorizedError());
    }

    this.requiresLogin(req, res, err => {
      if (err) return next(err);
      return req.params.id === req.userId ? next() : next(new Errors.UnauthorizedError());
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
        .execute((err, user) => {
          if (err || !user) return next(new Errors.UnauthorizedError());
          return user.type === USER_TYPE.CLIENT ? next() : next(new Errors.UnauthorizedError());
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
        .execute((err, user) => {
          if (err || !user) return next(new Errors.UnauthorizedError());
          return user.type === USER_TYPE.RESEARCHER ? next() : next(new Errors.UnauthorizedError());
        });
    });
  }
}

module.exports = CommonAuth;
