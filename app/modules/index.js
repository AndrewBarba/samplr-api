"use strict";

class Modules {

  init(next) {

    // Load all modules
    require('./auth');
    require('./user');
    require('./group');
    require('./survey');

    process.nextTick(next);
  }
}

module.exports = new Modules();
