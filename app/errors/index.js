"use strict";

/* ------------------------------------------------------------------------- *
 * Abstract Application Error
 * ------------------------------------------------------------------------- */

class AppError {
  constructor(statusCode, message) {
    this._error = new Error(message);
    this._statusCode = statusCode;
  }

  get error() { return this._error; }
  get statusCode() { return this._statusCode; }

  toString() {
    return `${this.statusCode} - ${this.error.toString()}`;
  }
}

/* ------------------------------------------------------------------------- *
 * Internal Server Error
 * ------------------------------------------------------------------------- */

class ServerError extends AppError {
  constructor(message) {
    super(500, message || "Server error");
  }
}

/* ------------------------------------------------------------------------- *
 * Bad Request Error
 * ------------------------------------------------------------------------- */

class BadRequestError extends AppError {
  constructor(message) {
    super(400, message || "Bad request");
  }
}

/* ------------------------------------------------------------------------- *
 * Unauthorized Error
 * ------------------------------------------------------------------------- */

class UnauthorizedError extends AppError {
  constructor(message) {
    super(401, message || "Unauthorized");
  }
}

/* ------------------------------------------------------------------------- *
 * Not Found Error
 * ------------------------------------------------------------------------- */

class NotFoundError extends AppError {
  constructor(message) {
    super(404, message || "Not found");
  }
}

/* ------------------------------------------------------------------------- *
 * Export
 * ------------------------------------------------------------------------- */

exports.ServerError = ServerError;
exports.BadRequestError = BadRequestError;
exports.UnauthorizedError = UnauthorizedError;
exports.NotFoundError = NotFoundError;
