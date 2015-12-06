"use strict";

const should = require('should');
const agent = require('test/lib/agent');

describe('Integration', () => {
  describe('Root', () => {
    describe('OK', () => {

      it('should be OK', done => {
        agent
          .client()
          .get('/')
          .expect(200)
          .end(function(err, result) {
            should.not.exist(err);
            result.body.name.should.equal("samplr-api");
            done();
          });
      });

    });
  });
});
