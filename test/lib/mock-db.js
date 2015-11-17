"use strict";

// const app = require('app');

class MockDB {

  reset(next) {
    next();
  }
}

module.exports = new MockDB();
