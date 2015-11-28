"use strict";

class Worker {

  start(next) {
    next();
  }

  stop(next) {
    next();
  }
}

module.exports = new Worker();
