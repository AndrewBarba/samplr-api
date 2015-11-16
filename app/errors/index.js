"use strict";

/* ------------------------------------------------------------------------- *
 * Abstract Application Error
 * ------------------------------------------------------------------------- */

class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this._statusCode = statusCode;
  }
  
  get statusCode() { return this._statusCode; }

  toString() {
    return `${this.statusCode} - ${this.message}`;
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

class InvalidArgumentError extends AppError {
  constructor(message) {
    super(500, message || "Invalid argument error");
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

exports.AppError = AppError;
exports.ServerError = ServerError;
exports.BadRequestError = BadRequestError;
exports.UnauthorizedError = UnauthorizedError;
exports.InvalidArgumentError = InvalidArgumentError;
exports.NotFoundError = NotFoundError;
