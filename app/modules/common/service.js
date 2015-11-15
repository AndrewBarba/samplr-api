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
  create(options, next) {
    return this
      .model
      .create(options)
      .save()
      .then(res => next(null, res))
      .error(err => next(err));
  }
}

module.exports = CommonService;
