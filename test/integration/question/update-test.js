"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');
const Question = require('modules/question');

describe('Integration', () => {
  describe('Question', () => {
    describe('Update', () => {

      let auth;

      let userData = {
        email: `int_question_update@test.com`,
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

      let question;

      before(done => {
        Question.create({
          title: "Hello, World",
          userId: auth.user.id,
          surveyId: "1234"
        }, (err, _question) => {
          if (err) return done(err);
          question = _question;
          done();
        });
      });

      let questionData = {
        title: "Hello, Question"
      };

      it('should update a question', done => {
        agent
          .client()
          .put('/question/' + question.id)
          .query({
            auth: auth.token
          })
          .send(questionData)
          .expect(200)
          .end(function(err, result) {
            should.not.exist(err);
            let question = result.body;
            should.exist(question);
            question.title.should.equal(questionData.title);
            done();
          });
      });

      it('should not update a question', done => {
        agent
          .client()
          .put('/question/' + question.id)
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
