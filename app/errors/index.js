"use strict";

/* ------------------------------------------------------------------------- *
 * Abstract Application Error
 * ------------------------------------------------------------------------- */

class AppError extends Error {
  constructor(statusCode, message, title) {
    super(message);
    this._statusCode = statusCode;
    this._title = title;
  }

  get statusCode() { return this._statusCode; }
  get title() { return this._title; }

  toString() {
    return `${this.statusCode} ${this.title} - ${this.message}`;
  }
}

/* ------------------------------------------------------------------------- *
 * Internal Server Error
 * ------------------------------------------------------------------------- */

class ServerError extends AppError {
  constructor(message) {
    super(500, message || "Server error", "Server Error");
  }
}

class InvalidArgumentError extends AppError {
  constructor(message) {
    super(500, message || "Invalid argument error", "Invalid argument error");
  }
}

/* ------------------------------------------------------------------------- *
 * Bad Request Error
 * ------------------------------------------------------------------------- */

class BadRequestError extends AppError {
  constructor(message) {
    super(400, message || "Bad request", "Bad request");
  }
}

class ValidatorError extends BadRequestError {
  constructor(message) {
    super(400, message || "Validation Error", "Validation Error");
  }
}

/* ------------------------------------------------------------------------- *
 * Unauthorized Error
 * ------------------------------------------------------------------------- */

class UnauthorizedError extends AppError {
  constructor(message) {
    super(401, message || "Unauthorized", "Unauthorized");
  }
}

/* ------------------------------------------------------------------------- *
 * Not Found Error
 * ------------------------------------------------------------------------- */

class NotFoundError extends AppError {
  constructor(message) {
    super(404, message || "Not found", "Not found");
  }
}

/* ------------------------------------------------------------------------- *
 * Export
 * ------------------------------------------------------------------------- */

exports.AppError = AppError;
exports.ServerError = ServerError;
exports.BadRequestError = BadRequestError;
exports.ValidatorError = ValidatorError;
exports.UnauthorizedError = UnauthorizedError;
exports.InvalidArgumentError = InvalidArgumentError;
exports.NotFoundError = NotFoundError;
