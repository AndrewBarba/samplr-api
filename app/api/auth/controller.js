"use strict";

const Errors = require('app/errors');
const Auth = require('modules/auth');

// Constants
const USER_TYPE = require('modules/user').TYPE;

/**
 * Register a new user
 *
 * @method register
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.register = (req, res, next) => {

  Auth.register({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    type: USER_TYPE.RESEARCHER
  }, (err, auth) => {
    if (err) return next(err);
    res.status(201).json(auth);
  });
};

/**
 * Register a new client user
 *
 * @method register
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.registerClient = (req, res, next) => {

  Auth.register({
    userId: req.userId,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    type: USER_TYPE.CLIENT
  }, (err, auth) => {
    if (err) return next(err);
    res.status(201).json(auth);
  });
};

/**
 * Login an existing user
 *
 * @method login
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.login = (req, res, next) => {

  let email = req.body.email;
  let password = req.body.password;

  Auth.login({
    email: email,
    password: password
  }, (err, auth) => {
    if (err) return next(new Errors.UnauthorizedError());
    res.status(200).json(auth);
  });
};
