"use strict";

const utils = require('lib/utils');
const CommonModel = require('modules/common').Model;

class AuthModel extends CommonModel {

  schema() {
    return {
      token: this.type.string().default(this.generateToken),
      userId: this.type.string().required(),
      password: this.type.string().required()
    };
  }

  index() {
    super.index();
    this.ensureIndex("token");
    this.ensureIndex("userId");
  }

  relationships() {
    this.belongsTo("User", "userId");
  }

  generateToken() {
    return utils.randomHex(128);
  }
}

module.exports = AuthModel;
