"use strict";

const should = require('should');
const agent = require('test/lib/agent');

describe('Integration', () => {
  describe('Status', () => {
    it('should be OK', done => {
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
});
