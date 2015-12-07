"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');
const Group = require('modules/group');
const Survey = require('modules/survey');
const Question = require('modules/question');
const Response = require('modules/response');

describe('Integration', () => {
  describe('Response', () => {
    describe('List Survey', () => {

      let auth;

      let userData = {
        email: `int_response_list_survey_res@test.com`,
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

      let clientAuth;

      let userClientData = {
        email: `int_response_list_survey_client@test.com`,
        password: "xxx123",
        firstName: "Andrew",
        lastName: "Test",
        type: "CLIENT",
        age: 22
      };

      before(done => {
        Auth.register(userClientData, (err, _clientAuth) => {
          if (err) return done(err);
          clientAuth = _clientAuth;
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

      let question;

      before(done => {
        Question.create({
          title: "How are you?",
          surveyId: survey.id,
          userId: auth.user.id,
          responses: [{
            value: 0,
            text: "Bad"
          }, {
            value: 1,
            text: "Good"
          }]
        }, (err, _question) => {
          if (err) return done(err);
          question = _question;
          done();
        });
      });

      let response;

      before(done => {
        Response.create({
          userId: clientAuth.user.id,
          surveyId: survey.id,
          questionId: question.id,
          date: new Date(),
          state: 'COMPLETE'
        }, (err, _response) => {
          if (err) return done(err);
          response = _response;
          done();
        });
      });
      
      it("response should exist and date should be defined", done => {
        should.exist(response);
        should.exist(response.date);
      });

      // it('should list responses', done => {
      //   agent
      //     .client()
      //     .get('/survey/' + survey.id + '/response')
      //     .query({
      //       auth: auth.token
      //     })
      //     .expect(200)
      //     .end(function(err, result) {
      //       should.not.exist(err);
      //       let responses = result.body;
      //       should.exist(responses);
      //       responses.length.should.equal(1);
      //       done();
      //     });
      // });

      it('should not list responses', done => {
        agent
          .client()
          .get('/survey/' + survey.id + '/response')
          .query({
            auth: '1234'
          })
          .expect(401)
          .end(done);
      });

    });
  });
});
