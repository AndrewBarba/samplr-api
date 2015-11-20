"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');
const Group = require('modules/group');

describe('Integration', () => {
  describe('Group', () => {
    describe('Update', () => {

      let auth;

      let userData = {
        email: `int_group_update@test.com`,
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

      let groupData = {
        name: "My Group"
      };

      it('should update a group', done => {
        agent
          .client()
          .put('/group/' + group.id)
          .query({
            auth: auth.token
          })
          .send(groupData)
          .expect(200)
          .end(function(err, result) {
            should.not.exist(err);
            let group = result.body;
            should.exist(group);
            group.name.should.equal(groupData.name);
            group.userId.should.equal(auth.user.id);
            done();
          });
      });

      it('should not update a group', done => {
        agent
          .client()
          .put('/group/' + group.id)
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
