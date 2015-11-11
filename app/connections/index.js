"use strict";

const async = require('async');

class Connections {
  constructor() {
    this._rethinkdb = require('./rethinkdb');
  }

  get rethinkdb() { return this._rethinkdb; }

  init(next) {
    async.parallel([
      done => {
        this.rethinkdb.init(done);
      }
    ], next);
  }
}

module.exports = new Connections();
