"use strict";

class Modules {

  init(next) {

    // Load all modules
    require('./auth');
    require('./user');
    require('./group');

    process.nextTick(next);
  }
}

module.exports = new Modules();
