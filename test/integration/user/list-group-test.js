"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');
const Group = require('modules/group');

describe('Integration', () => {
  describe('User', () => {
    describe('List Groups', () => {

      let auth;

      let userData = {
        email: `int_user_list_group@test.com`,
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

      let group;

      before(done => {
        Group.create({
          name: "Hello, World",
          userId: auth.user.id
        }, (err, _group) => {
          if (err) return done(err);
          group = _group;
          done();
        });
      });

      it('should list groups', done => {
        agent
          .client()
          .get('/user/' + auth.user.id + '/group')
          .query({
            auth: auth.token
          })
          .expect(200)
          .end(function(err, result) {
            should.not.exist(err);
            let groups = result.body;
            groups.length.should.equal(1);
            done();
          });
      });

      it('should not list groups', done => {
        agent
          .client()
          .get('/user/' + auth.user.id + '/group')
          .query({
            auth: '1234'
          })
          .send({})
          .expect(401)
          .end(done);
      });

    });
  });
});
