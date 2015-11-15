"use strict";

const _ = require('underscore');
const thinky = require('connections').thinky;

class CommonModel {

  constructor(modelName, options) {

    // Rethink properties
    this._thinky = thinky;
    this._type = thinky.type;
    this._r = thinky.r;

    // Init model
    this._schema = _.extend(this.baseSchema(), this.schema());
    this._model = thinky.createModel(modelName, this._schema, options);
  }

  // Getters
  get model() { return this._model; }
  get thinky() { return this._thinky; }
  get type() { return this._type; }
  get r() { return this._r; }

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
}

module.exports = CommonModel;
