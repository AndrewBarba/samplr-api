"use strict";

const _ = require('underscore');
const thinky = require('connections').thinky;
const type = thinky.type;
const r = thinky.r;

class CommonModel {

  constructor(modelName, options) {
    this._ThinkySchema = _.extend(this.baseSchema(), this.schema());
    this._ThinkyModel = thinky.createModel(modelName, this._ThinkySchema, options);
    _.extend(this, this._ThinkyModel);
  }

  get thinky() { return thinky; }
  get type() { return type; }
  get r() { return r; }

  /**
   * Base schema for all models
   *
   * @method baseSchema
   * @return Object
   */
  baseSchema() {
    return {
      id: this.type.string()
    };
  }

  /**
   * Schema for model, override in subclass
   *
   * @method schema
   * @return Object
   */
  schema() {
    return {};
  }

  /**
   * Create an instance of this model
   *
   * @method new
   * @param {Object} options
   * @return {ThinkyModel}
   */
  new(options) {
    let Model = this._ThinkyModel;
    return new Model(options);
  }
}

module.exports = CommonModel;
