"use strict";

const Auth = require('modules/auth');

/**
 * Register a new user
 *
 * @method register
 * @param {Request}  req
 * @param {Response} res
 * @param {Function} next
 */
exports.register = (req, res, next) => {

  let email = req.body.email;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let age = req.body.age;

  Auth.register({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    age: age
  }, function(err, auth) {
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
  }, function(err, auth) {
    if (err) return next(err);
    res.status(200).json(auth);
  });
};
