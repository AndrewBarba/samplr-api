"use strict";

const CommonModel = require('modules/common').Model;

class GroupModel extends CommonModel {

  schema() {
    return {
      name: this.type.string().required(),
      userId: this.type.string().required()
    };
  }

  relationships() {
    this.belongsTo("User", "userId");
  }
}

module.exports = GroupModel;
