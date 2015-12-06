"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');
const Group = require('modules/group');
const Survey = require('modules/survey');
const Question = require('modules/question');

describe('Integration', () => {
  describe('Survey', () => {
    describe('List Question', () => {

      let auth;

      let userData = {
        email: `int_survey_list_question@test.com`,
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

      let question;

      before(done => {
        Question.create({
          title: "Hello, World",
          userId: auth.user.id,
          surveyId: survey.id
        }, (err, _question) => {
          if (err) return done(err);
          question = _question;
          done();
        });
      });

      it('should list questions', done => {
        agent
          .client()
          .get('/survey/' + survey.id + '/question')
          .query({
            auth: auth.token
          })
          .expect(200)
          .end(function(err, result) {
            should.not.exist(err);
            let questions = result.body;
            questions.length.should.equal(1);
            done();
          });
      });

      it('should not list surveys', done => {
        agent
          .client()
          .get('/survey/' + survey.id + '/question')
          .query({
            auth: '1234'
          })
          .send({})
          .expect(401)
          .end(done);
      });
      
     it('should return a CSV response of users:surveys:answers', done => {
        agent
          .client()
          .get("/survey/" + survey.id + "/response/csv")
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
