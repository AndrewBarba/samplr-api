"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');

describe('Integration', () => {
  describe('Group', () => {
    describe('Create', () => {

      let auth;

      let userData = {
        email: `int_group_create@test.com`,
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

      let groupData = {
        name: "My Group"
      };

      it('should create a group', done => {
        agent
          .client()
          .post('/group')
          .query({
            auth: auth.token
          })
          .send(groupData)
          .expect(201)
          .end(function(err, result) {
            should.not.exist(err);
            let group = result.body;
            should.exist(group);
            group.name.should.equal(groupData.name);
            group.userId.should.equal(auth.user.id);
            done();
          });
      });

      it('should not create a group', done => {
        agent
          .client()
          .post('/group')
          .send(groupData)
          .expect(401)
          .end(done);
      });

    });
  });
});
