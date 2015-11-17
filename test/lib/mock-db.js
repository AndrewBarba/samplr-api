"use strict";

const async = require('async');
const config = require('config');
const thinky = require('thinky')(config.rethinkdb);
const r = thinky.r;

class MockDB {

  reset(next) {
    async.series([
      done => r.dbDrop('test').run(() => done()),
      done => r.dbCreate('test').run(() => done())
    ], next);
  }
}

module.exports = new MockDB();
