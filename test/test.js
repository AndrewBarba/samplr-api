"use strict";

process.env.NODE_ENV = 'test';

describe('Integration', function() {
  it('should run integration tests', function() {
    require('./integration');
  });
});

describe('Unit', function() {
  it('should run unit tests', function() {
    require('./unit');
  });
});
