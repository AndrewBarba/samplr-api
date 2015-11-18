"use strict";

const _ = require('underscore');
const expressValidator = require('express-validator');

module.exports = () => {
  return expressValidator({
    customValidators: {
      isArray: _.isArray,
      isBoolean: _.isBoolean,
      isFunction: _.isFunction,
      isNumber: _.isNumber,
      isObject: _.isObject,
      isString: _.isString
    }
  });
};
