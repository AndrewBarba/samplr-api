"use strict";

const _ = require('underscore');

// Model
const CommonModel = require('modules/common').Model;

// Constants
const USER_TYPE = require('./type');

class UserModel extends CommonModel {

  schema() {
    return {
      firstName: this.type.string().min(1).required(),
      lastName: this.type.string().min(1).required(),
      email: this.type.string().email().required(),
      age: this.type.number().integer().min(0).max(199).required(),
      type: this.type.string().enum(_.values(USER_TYPE)).required()
    };
  }

  index() {
    super.index();
    this.ensureIndex("email");
  }
}

module.exports = UserModel;
