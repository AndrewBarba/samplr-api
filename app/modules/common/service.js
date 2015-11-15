"use strict";

class CommonService {

  constructor(model) {
    this._model = model;
  }

  get model() { return this._model; }

  /**
   * Creates and saves an object in the database
   *
   * @method create
   * @param {Object} options
   * @return {Promise}
   */
  create(options) {
    return this.model.create(options).save();
  }
}

module.exports = CommonService;
