"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');
const User = require('modules/user');

describe('Integration', () => {
  describe('User', () => {
    describe('Search', () => {

      let auth;

      let userResData = {
        email: `int_user_search@test.com`,
        password: "xxx123",
        firstName: "Andrew",
        lastName: "Test",
        type: "RESEARCHER",
        age: 22
      };

      before(done => {
        Auth.register(userResData, (err, _auth) => {
          if (err) return done(err);
          auth = _auth;
          done();
        });
      });

      let user;

      before(done => {
        let userClientData = {
          email: `int_user_search_client@test.com`,
          password: "xxx123",
          firstName: "Andrew",
          lastName: "Test",
          type: "CLIENT",
          userId: auth.user.id,
          age: 22
        };

        User.create(userClientData, (err, _user) => {
          if (err) return done(err);
          user = _user;
          done();
        });
      });

      it('should search for a user', done => {
        agent
          .client()
          .get('/user/search')
          .query({
            auth: auth.token,
            query: "And Te"
          })
          .expect(200)
          .end(function(err, result) {
            should.not.exist(err);
            let users = result.body;
            should.exist(users);
            users.length.should.be.greaterThan(0);
            done();
          });
      });

      it('should not search', done => {
        agent
          .client()
          .get('/user/search')
          .expect(401)
          .end(done);
      });

    });
  });
});
