"use strict";

const CommonModel = require('modules/common').Model;

class TemplateModel extends CommonModel {

  schema() {
    return {
      template: this.type.string()
    };
  }

  index() {
    super.index();
  }

  relationships() {
    // setup
  }
}

module.exports = TemplateModel;
