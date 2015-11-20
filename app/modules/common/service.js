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
   * @param  {Object}   options
   * @param  {Function} next
   * @return {Promise}
   */
  create(options, next) {
    return this
      .model
      .create(options)
      .save(next);
  }

  /**
   * Read a single object by ID
   *
   * @method read
   * @param  {String}   objectId
   * @param  {Function} next
   * @return {Promise}
   */
  read(objectId, next) {
    let r = this
      .model
      .get(objectId);

    return rQuery(r, next);
  }

  /**
   * Read a single object by an indexed key and value
   *
   * @description If you do not pass next it is up to the caller to unwrap the array!!!
   *
   * @method readIndex
   * @param  {String}   key
   * @param  {String}   value
   * @param  {Function} next
   * @return {Promise}
   */
  readIndex(key, value, next) {
    let r = this
      .model
      .getAll(value, { index: key })
      .limit(1);

    return rOneQuery(r, next);
  }

  /**
   * List objects by an indexed key and value
   *
   * @method findIndex
   * @param  {String}   key
   * @param  {String}   value
   * @param  {Function} [next]
   * @return {Promise}
   */
  listIndex(key, value, next) {
    let r = this
      .model
      .getAll(value, { index: key });

    return rQuery(r, next);
  }

  /**
   * List objects
   *
   * @method findIndex
   * @param  {Object}   options
   * @param  {Function} [next]
   * @return {Promise}
   */
  list(options, next) {
    let r = this
      .model
      .filter(options);

    return rQuery(r, next);
  }
}

function rQuery(r, next) {
  if (!next) return r;
  return r.run(next);
}

function rOneQuery(r, next) {
  if (!next) return r;
  return r.run((err, res) => {
    if (err) return next(err);
    next(null, res[0]);
  });
}

module.exports = CommonService;
