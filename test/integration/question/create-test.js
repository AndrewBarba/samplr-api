"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');
const Group = require('modules/group');
const Survey = require('modules/survey');

describe('Integration', () => {
  describe('Question', () => {
    describe('Create', () => {

      let auth;

      let userData = {
        email: `int_question_create@test.com`,
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

      it('should create a question', done => {

        let questionData = {
          title: "How are you?",
          surveyId: survey.id,
          responses: [{
            value: 0,
            text: "Bad"
          }, {
            value: 1,
            text: "Good"
          }]
        };

        agent
          .client()
          .post('/question')
          .query({
            auth: auth.token
          })
          .send(questionData)
          .expect(201)
          .end(function(err, result) {
            should.not.exist(err);
            let question = result.body;
            question.title.should.equal(questionData.title);
            question.responses.length.should.equal(questionData.responses.length);
            question.responses[0].text.should.equal(questionData.responses[0].text);
            question.responses[0].value.should.equal(questionData.responses[0].value);
            question.responses[1].text.should.equal(questionData.responses[1].text);
            question.responses[1].value.should.equal(questionData.responses[1].value);
            done();
          });
      });

      it('should not create a question', done => {
        agent
          .client()
          .post('/question')
          .send({
            name: "My Survey",
            surveyId: survey.id
          })
          .expect(401)
          .end(done);
      });

    });
  });
});
