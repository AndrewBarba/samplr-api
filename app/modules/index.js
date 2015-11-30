"use strict";

class Modules {

  init(next) {

    // Load all modules
    require('./auth');
    require('./user');
    require('./group');
    require('./survey');
    require('./question');
    require('./response');

    process.nextTick(next);
  }
}

module.exports = new Modules();
