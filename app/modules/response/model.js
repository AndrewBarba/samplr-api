"use strict";

const _ = require('underscore');
const CommonModel = require('modules/common').Model;

// Constants
const RESPONSE_STATE = {
  PENDING: 'PENDING',
  COMPLETE: 'COMPLETE',
  EXPIRED: 'EXPIRED'
};

class ResponseModel extends CommonModel {

  schema() {
    return {
      userId: this.type.string().required(),
      questionId: this.type.string().required(),
      state: this.type.string().enum(_.values(RESPONSE_STATE)).default(RESPONSE_STATE.PENDING),
      value: this.type.number().integer()
    };
  }

  relationships() {
    this.belongsTo("User", "userId");
    this.belongsTo("Question", "questionId");
  }
}

module.exports = ResponseModel;
