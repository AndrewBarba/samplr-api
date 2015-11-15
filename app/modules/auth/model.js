"use strict";

const utils = require('lib/utils');
const CommonModel = require('modules/common').Model;

class AuthModel extends CommonModel {

  schema() {
    return {
      token: this.type.string().default(this.generateToken),
      userId: this.type.string()
    };
  }

  index() {
    super.index();
    this.ensureIndex("token");
  }

  relationships() {
    this.belongsTo("User", "userId");
  }

  generateToken() {
    return utils.randomHex(128);
  }
}

module.exports = AuthModel;
