"use strict";

const CommonModel = require('modules/common').Model;

class GroupModel extends CommonModel {

  schema() {
    return {
      name: this.type.string(),
      userId: this.type.string()
    };
  }

  index() {
    super.index();
  }

  relationships() {
    this.belongsTo("User", "userId");
    this.hasAndBelongsToMany("User");
  }
}

module.exports = GroupModel;
