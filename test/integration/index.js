"use strict";

const agent = require('test/lib/agent');

describe('Integration', () => {
  it('should start the server', done => {
    agent.start(done);
  });
});
