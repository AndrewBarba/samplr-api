"use strict";

const _ = require('underscore');
const CommonModel = require('modules/common').Model;

// Constants
const SURVEY_STATE = require('./state');
const SURVEY_TIME = require('./time');

class SurveyModel extends CommonModel {

  schema() {
    return {
      userId: this.type.string().required(),
      groupId: this.type.string().required(),
      name: this.type.string().required(),
      state: this.type.string().enum(_.values(SURVEY_STATE)).default(SURVEY_STATE.PENDING),
      schedule: [{
        time: this.type.string().enum(_.values(SURVEY_TIME))
      }]
    };
  }

  relationships() {
    this.belongsTo("User", "userId");
    this.belongsTo("Group", "groupId");
  }
}

module.exports = SurveyModel;
