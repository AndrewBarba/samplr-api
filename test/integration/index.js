"use strict";

const agent = require('test/lib/agent');
const should = require('should');

before(done => agent.start(done));

it('should start the server', () => {
  should.exist(agent.client());
});
