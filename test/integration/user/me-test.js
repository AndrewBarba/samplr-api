"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');

describe('Integration', () => {
  describe('User', () => {
    describe('Me', () => {

      let auth;

      let userData = {
        email: `int_user_me@test.com`,
        password: "xxx123",
        firstName: "Andrew",
        lastName: "Test",
        type: "RESEARCHER",
        age: 22
      };

      before(done => {
        Auth.register(userData, (err, _auth) => {
          if (err) return done(err);
          auth = _auth;
          done();
        });
      });

      it('should get current user', done => {
        agent
          .client()
          .get('/me')
          .query({
            auth: auth.token
          })
          .expect(200)
          .end(function(err, result) {
            should.not.exist(err);
            let user = result.body;
            should.exist(user);
            user.id.should.equal(auth.user.id);
            user.firstName.should.equal(auth.user.firstName);
            user.lastName.should.equal(auth.user.lastName);
            done();
          });
      });

      it('should not get me', done => {
        agent
          .client()
          .get('/me')
          .expect(401)
          .end(done);
      });

    });
  });
});
