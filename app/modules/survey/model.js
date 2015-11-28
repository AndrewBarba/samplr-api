"use strict";

const _ = require('underscore');
const CommonModel = require('modules/common').Model;

// Constants
const SURVEY_TIME = {
  SUNRISE: 'SUNRISE',
  MORNING: 'MORNING',
  NOON: 'NOON',
  SUNSET: 'SUNSET',
  NIGHT: 'NIGHT'
};

class SurveyModel extends CommonModel {

  schema() {
    return {
      name: this.type.string().required(),
      groupId: this.type.string().required(),
      schedule: [{
        time: this.type.string().enum(_.values(SURVEY_TIME))
      }]
    };
  }

  relationships() {
    this.belongsTo("Group", "groupId");
  }
}

module.exports = SurveyModel;
