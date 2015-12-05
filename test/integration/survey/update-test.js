"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');
const Group = require('modules/group');
const Survey = require('modules/survey');

describe('Integration', () => {
  describe('Survey', () => {
    describe('Update', () => {

      let auth;

      let userData = {
        email: `int_survey_update@test.com`,
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

      let surveyData = {
        name: "Updated name"
      };

      it('should update a survey', done => {
        agent
          .client()
          .put('/survey/' + survey.id)
          .query({
            auth: auth.token
          })
          .send(surveyData)
          .expect(200)
          .end(function(err, result) {
            should.not.exist(err);
            let survey = result.body;
            should.exist(survey);
            survey.name.should.equal(surveyData.name);
            survey.userId.should.equal(auth.user.id);
            done();
          });
      });

      it('should not update a survey', done => {
        agent
          .client()
          .put('/survey/' + survey.id)
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
