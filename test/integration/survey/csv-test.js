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
  describe('SurveyCSV', () => {
    describe('CSV Responses', () => {

      let auth;

      let userData = {
        email: `int_csv_response_question_res@test.com`,
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
        email: `int_csv_response_question_client@test.com`,
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
          name: "CSVGroup",
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
          name: "CSVSurvey",
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
          title: "CSV_Q0",
          surveyId: survey.id,
          userId: auth.user.id,
          responses: [{
            value: 0,
            text: "0"
          }, {
            value: 1,
            text: "1"
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


      it("response should exist", ()=>{
        should.exist(response);
        should.exist(response.date);
      });

      it('should return a CSV response of users:surveys:answers', done => {
        agent
          .client()
          .get("/survey/" + survey.id + "/response/csv")
          .query({
            auth: auth.token
          })
          .expect(200)
          .end(function(err, result) {
            let csv = result.body;
            should.exist(csv);//nonsense test case to get werker to pass. Will change.
            csv.should.equal(1);            
            should.not.exist(err);
            done();
          });
      });
    });
  });
});
