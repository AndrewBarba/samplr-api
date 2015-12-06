"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');

describe('Integration', () => {
  describe('User', () => {
    describe('Add Push', () => {

      let auth;

      let userData = {
        email: `int_user_add_push@test.com`,
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

      let iosData = {
        token: 'abcd',
        type: 'ios'
      };

      it('should add a push token', done => {
        agent
          .client()
          .put('/user/' + auth.user.id + '/push')
          .query({
            auth: auth.token
          })
          .send(iosData)
          .expect(200)
          .end(function(err, result) {
            should.not.exist(err);
            let user = result.body;
            should.exist(user);
            user.firstName.should.equal(auth.user.firstName);
            user.lastName.should.equal(auth.user.lastName);
            user.email.should.equal(auth.user.email);
            user.push.token.should.equal(iosData.token);
            user.push.type.should.equal(iosData.type);
            done();
          });
      });

      let androidData = {
        token: 'efgh',
        type: 'android'
      };

      it('should add a push token', done => {
        agent
          .client()
          .put('/user/' + auth.user.id + '/push')
          .query({
            auth: auth.token
          })
          .send(androidData)
          .expect(200)
          .end(function(err, result) {
            should.not.exist(err);
            let user = result.body;
            should.exist(user);
            user.firstName.should.equal(auth.user.firstName);
            user.lastName.should.equal(auth.user.lastName);
            user.email.should.equal(auth.user.email);
            user.push.token.should.equal(androidData.token);
            user.push.type.should.equal(androidData.type);
            done();
          });
      });

      it('should not add a push', done => {
        agent
          .client()
          .put('/user/' + auth.user.id + '/push')
          .query({
            auth: auth.token
          })
          .send({})
          .expect(400)
          .end(done);
      });

    });
  });
});
