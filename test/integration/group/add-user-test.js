"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');
const Group = require('modules/group');

describe('Integration', () => {
  describe('Group', () => {
    describe('Add User', () => {

      let auth;

      let userData = {
        email: `int_group_add_user@test.com`,
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

      it('should add a user to a group', done => {
        agent
          .client()
          .put('/group/' + group.id + '/user')
          .query({
            auth: auth.token
          })
          .send({
            userId: auth.user.id
          })
          .expect(201)
          .end(function(err, result) {
            should.not.exist(err);
            let group = result.body;
            should.exist(group);
            console.log(group);
            done();
          });
      });

      it('should not add a user to a group', done => {
        agent
          .client()
          .put('/group/' + group.id + '/user')
          .query({
            auth: auth.token
          })
          .send({
            userId: '1234'
          })
          .expect(500)
          .end(done);
      });

    });
  });
});
