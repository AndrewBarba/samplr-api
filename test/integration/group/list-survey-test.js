"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');
const Group = require('modules/group');
const Survey = require('modules/survey');

describe('Integration', () => {
  describe('Group', () => {
    describe('List Survey', () => {

      let auth;

      let userData = {
        email: `int_group_list_survey@test.com`,
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

      let survey;

      before(done => {
        Survey.create({
          name: "Hello, World",
          userId: auth.user.id,
          groupId: group.id
        }, (err, _survey) => {
          if (err) return done(err);
          survey = _survey;
          done();
        });
      });

      it('should list surveys', done => {
        agent
          .client()
          .get('/group/' + group.id + '/survey')
          .query({
            auth: auth.token
          })
          .expect(200)
          .end(function(err, result) {
            should.not.exist(err);
            let surveys = result.body;
            surveys.length.should.equal(1);
            done();
          });
      });

      it('should not list surveys', done => {
        agent
          .client()
          .get('/group/' + group.id + '/survey')
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
