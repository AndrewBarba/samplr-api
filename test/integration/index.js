"use strict";

process.env.NODE_ENV = 'test';

const should = require('should');
const agent = require('test/lib/agent');

describe('Integration', () => {

  // Start the server
  before(done => agent.start(done));

  it('should be OK', function(done) {
    agent
      .client
      .get('/status')
      .expect(200)
      .end(function(err, result) {
        should.not.exist(err);
        result.body.status.should.equal("OK");
        done();
      });
  });
});
