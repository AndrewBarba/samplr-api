"use strict";

const _ = require('underscore');
const thinky = require('app/connections').thinky;
const type = thinky.type;
const r = thinky.r;

class CommonModel {

  constructor(modelName, options) {

    // Create Thinky model
    let schema = _.extend(this.baseSchema(), this.schema());
    this._model = thinky.createModel(modelName, schema, options);

    // Build indexes
    this.index();

    // Build relationships on next tick
    process.nextTick(() => this.relationships());
  }

  // Rethink getters
  get Model() { return this._model; }
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
      id: this.type.string(),
      created: this.type.date().default(() => new Date()),
      modified: this.type.date().default(() => new Date())
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
   * Build indexes on the given model
   *
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
    // setup
  }

  /**
   * Forward ensureIndex method
   *
   * @method ensureIndex
   */
  ensureIndex(key) {
    this.Model.ensureIndex(key);
    return this;
  }

  /**
   * Create an instance of this model
   *
   * @method create
   * @param  {Object} options
   * @return {ThinkyObject}
   */
  create(options) {
    return new this.Model(options);
  }

  /**
   * Forward get method
   *
   * @method get
   */
  get(objectId) {
    return this.Model.get(objectId);
  }

  /**
   * Forward getAll method
   *
   * @method readIndex
   */
  getAll(value, options) {
    return this.Model.getAll(value, options);
  }

  /**
   * Forward hasOne method
   *
   * @method hasOne
   */
  hasOne(modelName, rightKey) {
    let OtherModel = thinky.models[modelName];
    OtherModel.ensureIndex(rightKey);
    this.Model.hasOne(OtherModel, modelName.toLowerCase(), "id", rightKey);
    return this;
  }

  /**
   * Forward belongsTo method
   *
   * @method belongsTo
   */
  belongsTo(modelName, leftKey) {
    let OtherModel = thinky.models[modelName];
    this.Model.ensureIndex(leftKey);
    this.Model.belongsTo(OtherModel, modelName.toLowerCase(), leftKey, "id");
    return this;
  }

  /**
   * Forward hasMany method
   *
   * @method hasMany
   */
  hasMany(modelName, rightKey) {
    let OtherModel = thinky.models[modelName];
    OtherModel.ensureIndex(rightKey);
    let key = `${modelName.toLowerCase()}s`;
    this.Model.hasMany(OtherModel, key, "id", rightKey);
    return this;
  }

  /**
   * Forward hasAndBelongsToMany method
   *
   * @method hasAndBelongsToMany
   */
  hasAndBelongsToMany(modelName) {
    let OtherModel = thinky.models[modelName];
    let key = `${modelName.toLowerCase()}s`;
    this.Model.hasAndBelongsToMany(OtherModel, key, "id", "id");
    return this;
  }
}

module.exports = CommonModel;
