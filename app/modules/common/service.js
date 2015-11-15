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
   * @param {Function} next
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

  /**
   * Read a single object by ID
   *
   * @method read
   * @param {String} objectId
   * @param {Function} next
   * @return {Promise}
   */
  read(objectId, next) {
    return this
      .model
      .get(objectId)
      .then(res => next(null, res))
      .error(err => next(err));
  }

  /**
   * Read a single object by indexed key and value
   *
   * @method readIndex
   * @param {String} key
   * @param {String} value
   * @param {Function} next
   * @return {Promise}
   */
  readIndex(key, value, next) {
    return this
      .model
      .getAll(value, { index: key })
      .limit(1)
      .then(res => next(null, res[0]))
      .error(err => next(err));
  }
}

module.exports = CommonService;
