"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');
const Group = require('modules/group');

describe('Integration', () => {
  describe('Group', () => {
    describe('Read', () => {

      let auth;

      let userData = {
        email: `int_group_read@test.com`,
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

      it('should read a group', done => {
        agent
          .client()
          .get('/group/' + group.id)
          .query({
            auth: auth.token
          })
          .expect(200)
          .end(function(err, result) {
            should.not.exist(err);
            let _group = result.body;
            should.exist(group);
            _group.name.should.equal(group.name);
            _group.userId.should.equal(auth.user.id);
            done();
          });
      });

      it('should not read a group', done => {
        agent
          .client()
          .get('/group/' + group.id)
          .query({
            auth: '1234'
          })
          .expect(401)
          .end(done);
      });

    });
  });
});
