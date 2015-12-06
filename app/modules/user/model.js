"use strict";

const _ = require('underscore');

// Model
const CommonModel = require('modules/common').Model;

// Constants
const USER_TYPE = require('./type');
const PUSH_TYPE = require('./push-type');

class UserModel extends CommonModel {

  schema() {
    return {
      firstName: this.type.string().min(1).required(),
      lastName: this.type.string().min(1).required(),
      email: this.type.string().email().required(),
      type: this.type.string().enum(_.values(USER_TYPE)).required(),
      age: this.type.number().integer().min(0).max(199).optional(),
      userId: this.type.string().optional(),
      push: {
        token: this.type.string().optional(),
        type: this.type.string().enum(_.values(PUSH_TYPE)).optional()
      }
    };
  }

  index() {
    super.index();
    this.ensureIndex("email");
    this.ensureIndex("userId");
    this.ensureIndex("name", doc => doc("firstName").add(doc("lastName")));
  }
}

module.exports = UserModel;
