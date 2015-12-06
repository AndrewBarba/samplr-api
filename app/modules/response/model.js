"use strict";

const _ = require('underscore');
const CommonModel = require('modules/common').Model;

// Constants
const RESPONSE_STATE = require('./state');

class ResponseModel extends CommonModel {

  schema() {
    return {
      date: this.type.date().required(),
      userId: this.type.string().required(),
      questionId: this.type.string().required(),
      surveyId: this.type.string().required(),
      state: this.type.string().enum(_.values(RESPONSE_STATE)).default(RESPONSE_STATE.PENDING),
      value: this.type.number().integer()
    };
  }

  index() {
    super.index();
    this.ensureIndex("date");
    this.ensureIndex("state");
  }

  relationships() {
    this.belongsTo("User", "userId");
    this.belongsTo("Question", "questionId");
    this.belongsTo("Survey", "surveyId");
  }
}

module.exports = ResponseModel;
