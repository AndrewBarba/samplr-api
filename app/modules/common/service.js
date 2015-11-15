"use strict";

class CommonService {

  constructor(model) {
    this._model = model;
  }

  get model() { return this._model; }
}

module.exports = CommonService;
