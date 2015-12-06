"use strict";

const agent = require('test/lib/agent');

describe('Integration', () => {
  describe('Root', () => {
    describe('Not Found', () => {

      it('should 404', done => {
        agent
          .client()
          .get('/bad-path')
          .expect(404)
          .end(done);
      });

    });
  });
});
