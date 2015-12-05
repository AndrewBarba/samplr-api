"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');

describe('Integration', () => {
  describe('Survey', () => {
    describe('Create', () => {

      let auth;

      let userData = {
        email: `int_survey_create@test.com`,
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

      let surveyData = {
        name: "My Survey",
        groupId: "12345",
        schedule: [{
          time: 'MORNING'
        }, {
          time: 'SUNSET'
        }]
      };

      it('should create a survey', done => {
        agent
          .client()
          .post('/survey')
          .query({
            auth: auth.token
          })
          .send(surveyData)
          .expect(201)
          .end(function(err, result) {
            should.not.exist(err);
            let survey = result.body;
            should.exist(survey);
            survey.name.should.equal(surveyData.name);
            survey.userId.should.equal(auth.user.id);
            survey.schedule.length.should.equal(surveyData.schedule.length);
            survey.schedule[0].time.should.equal(surveyData.schedule[0].time);
            survey.schedule[1].time.should.equal(surveyData.schedule[1].time);
            done();
          });
      });

      it('should not create a survey', done => {
        agent
          .client()
          .post('/survey')
          .send(surveyData)
          .expect(401)
          .end(done);
      });

    });
  });
});
