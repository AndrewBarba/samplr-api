"use strict";

const CommonModel = require('modules/common').Model;

class UserModel extends CommonModel {

  schema() {
    return {
      firstName: this.type.string().min(1).required(),
      lastName: this.type.string().min(1).required(),
      email: this.type.string().email().required(),
      age: this.type.number().integer().min(0).max(199).required()
    };
  }
}

module.exports = UserModel;
