"use strict";

const _ = require('underscore');
const thinky = require('connections').thinky;
const type = thinky.type;
const r = thinky.r;

// Base model
const Model = require('thinky/lib/model');

class CommonModel {

  constructor(modelName, options) {

    // Create Thinky model
    this._schema = _.extend(this.baseSchema(), this.schema());
    this._model = thinky.createModel(modelName, this._schema, options);

    // Forward all model functions
    _.each(Model.prototype, (fn, name) => {
      if (this[name] || !_.isFunction(fn)) return;
      this[name] = () => fn.apply(this._model, arguments);
    });

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
   * @method create
   * @param {Object} options
   * @return {ThinkyModel}
   */
  create(options) {
    let Model = this.Model;
    return new Model(options);
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
  }

  /**
   * Forward hasOne method
   *
   * @method hasOne
   */
  hasOne(modelName, rightKey) {
    let OtherModel = thinky.models[modelName];
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
    this.Model.hasMany(OtherModel, modelName.toLowerCase(), "id", rightKey);
    return this;
  }

  /**
   * Forward hasAndBelongsToMany method
   *
   * @method hasAndBelongsToMany
   */
  hasAndBelongsToMany(modelName) {
    let OtherModel = thinky.models[modelName];
    this.Model.hasAndBelongsToMany(OtherModel, modelName.toLowerCase(), "id", "id");
    return this;
  }
}

module.exports = CommonModel;
