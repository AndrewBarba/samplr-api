"use strict";

class Modules {

  init(next) {

    // Load all modules
    require('./response');
    require('./question');
    require('./survey');
    require('./group');
    require('./user');
    require('./auth');

    process.nextTick(next);
  }
}

module.exports = new Modules();
