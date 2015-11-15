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

  // Rethink getters
  get thinky() { return thinky; }
  get type() { return type; }
  get r() { return r; }

  // Getters
  get Schema() { return this._ThinkySchema; }
  get Model() { return this._ThinkyModel; }

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
    let Model = this.Model;
    return new Model(options);
  }

  /**
   * Forward hasOne method
   *
   * @method hasOne
   */
  hasOne(OtherModel, fieldName, leftKey, rightKey) {
    return this.Model.hasOne(OtherModel.Model, fieldName, leftKey, rightKey);
  }

  /**
   * Forward belongsTo method
   *
   * @method belongsTo
   */
  belongsTo(OtherModel, fieldName, leftKey, rightKey) {
    return this.Model.belongsTo(OtherModel.Model, fieldName, leftKey, rightKey);
  }

  /**
   * Forward hasMany method
   *
   * @method hasMany
   */
  hasMany(OtherModel, fieldName, leftKey, rightKey) {
    return this.Model.hasMany(OtherModel.Model, fieldName, leftKey, rightKey);
  }

  /**
   * Forward hasAndBelongsToMany method
   *
   * @method hasAndBelongsToMany
   */
  hasAndBelongsToMany(OtherModel, fieldName, leftKey, rightKey) {
    return this.Model.hasAndBelongsToMany(OtherModel.Model, fieldName, leftKey, rightKey);
  }
}

module.exports = CommonModel;
