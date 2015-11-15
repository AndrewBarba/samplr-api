"use strict";

const _ = require('underscore');
const thinky = require('connections').thinky;
const type = thinky.type;
const r = thinky.r;

class CommonModel {

  constructor(modelName, options) {

    // Create Thinky model
    this._schema = _.extend(this.baseSchema(), this.schema());
    this._model = thinky.createModel(modelName, this._schema, options);

    // Build indexes
    this.index();

    // Build relationships on next tick
    process.nextTick(() => this.relationships());
  }

  // Rethink getters
  get thinky() { return thinky; }
  get type() { return type; }
  get r() { return r; }

  // Getters
  get Schema() { return this._schema; }
  get Model() { return this._model; }

  /**
   * Base schema for all models
   *
   * @method baseSchema
   * @return Object
   */
  baseSchema() {
    return {
      id: this.type.string(),
      created: this.type.date().default(() => new Date())
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
   * Build indexes on the given model
   *
   * @param {Model} Model
   * @method buildIndexes
   */
  index() {
    this.ensureIndex("created");
  }

  /**
   * Build relationships for this model. Override in subclass
   * This will be called after all models are created
   *
   * @method relationships
   */
  relationships() {
  }

  /**
   * Forward ensureIndex method
   *
   * @method ensureIndex
   */
  ensureIndex(name, fn, options) {
    this.Model.ensureIndex(name, fn, options);
    return this;
  }

  /**
   * Forward hasOne method
   *
   * @method hasOne
   */
  hasOne(moduleName, rightKey) {
    let OtherModel = require(`modules/${moduleName}`).model;
    this.Model.hasOne(OtherModel.Model, moduleName, "id", rightKey);
    return this;
  }

  /**
   * Forward belongsTo method
   *
   * @method belongsTo
   */
  belongsTo(moduleName, leftKey) {
    let OtherModel = require(`modules/${moduleName}`).model;
    this.Model.belongsTo(OtherModel.Model, moduleName, leftKey, "id");
    return this;
  }

  /**
   * Forward hasMany method
   *
   * @method hasMany
   */
  hasMany(moduleName, rightKey) {
    let OtherModel = require(`modules/${moduleName}`).model;
    this.Model.hasMany(OtherModel.Model, moduleName, "id", rightKey);
    return this;
  }

  /**
   * Forward hasAndBelongsToMany method
   *
   * @method hasAndBelongsToMany
   */
  hasAndBelongsToMany(moduleName) {
    let OtherModel = require(`modules/${moduleName}`).model;
    this.Model.hasAndBelongsToMany(OtherModel.Model, moduleName, "id", "id");
    return this;
  }
}

module.exports = CommonModel;
