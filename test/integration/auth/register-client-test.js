"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');

describe('Integration', () => {
  describe('Auth', () => {
    describe('Register Client', () => {

      let auth;

      let userData = {
        email: `int_auth_reg_researcher@test.com`,
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

      let data = {
        email: `int_auth_reg_client@test.com`,
        password: "xxx123",
        firstName: "Andrew",
        lastName: "Test",
        age: 22
      };

      it('should register a new user', done => {
        agent
          .client()
          .post('/auth/register/client')
          .query({
            auth: auth.token
          })
          .send(data)
          .expect(201)
          .end(function(err, result) {
            should.not.exist(err);
            let auth = result.body;
            should.exist(auth);
            should.exist(auth.token);
            should.not.exist(auth.password);
            should.exist(auth.user);
            auth.user.email.should.equal(data.email);
            auth.user.firstName.should.equal(data.firstName);
            auth.user.lastName.should.equal(data.lastName);
            auth.user.age.should.equal(data.age);
            auth.user.type.should.equal("CLIENT");
            done();
          });
      });

      it('should not register a new user', done => {
        agent
          .client()
          .post('/auth/register')
          .send(data)
          .expect(400)
          .end(done);
      });

    });
  });
});
