"use strict";

const CommonModel = require('modules/common').Model;

class QuestionModel extends CommonModel {

  schema() {
    return {
      userId: this.type.string().required(),
      title: this.type.string(),
      responses: [{
        key: this.type.number().integer(),
        value: this.type.number().integer(),
        text: this.type.string()
      }]
    };
  }

  relationships() {
    this.belongsTo("User", "userId");
    this.hasAndBelongsToMany("Survey");
  }
}

module.exports = QuestionModel;
