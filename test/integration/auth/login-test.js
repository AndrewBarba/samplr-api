"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');

describe('Integration', () => {
  describe('Auth', () => {
    describe('Login', () => {

      let data = {
        email: `int_auth_login@test.com`,
        password: "xxx123",
        firstName: "Andrew",
        lastName: "Test",
        type: "RESEARCHER",
        age: 22
      };

      before(done => Auth.register(data, done));

      it('should login a new user', done => {
        agent
          .client()
          .post('/auth/login')
          .send({
            email: data.email,
            password: data.password
          })
          .expect(200)
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
            auth.user.type.should.equal(data.type);
            done();
          });
      });

      it('should not login a new user', done => {
        agent
          .client()
          .post('/auth/login')
          .send({
            email: data.email,
            password: "wrong password"
          })
          .expect(400)
          .end(done);
      });

    });
  });
});
