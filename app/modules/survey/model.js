"use strict";

const CommonModel = require('modules/common').Model;

class SurveyModel extends CommonModel {

  schema() {
    return {
      name: this.type.string().required(),
      groupId: this.type.string().required()
    };
  }

  relationships() {
    this.belongsTo("Group", "groupId");
  }
}

module.exports = SurveyModel;
