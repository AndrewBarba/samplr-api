"use strict";

const should = require('should');
const moment = require('moment');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');
const User = require('modules/user');
const Group = require('modules/group');
const Survey = require('modules/survey');
const Question = require('modules/question');

describe('Integration', () => {
  describe('Survey', () => {
    describe('Add User', () => {

      let auth;

      let userData = {
        email: `int_survey_add_user@test.com`,
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
          groupId: group.id,
          schedule: [{
            time: 'NOON'
          }, {
            time: 'MORNING'
          }, {
            time: 'SUNRISE'
          }, {
            time: 'SUNSET'
          }, {
            time: 'NIGHT'
          }]
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

      let user;

      before(done => {
        User.create({
          email: `int_survey_add_user_client@test.com`,
          firstName: "Andrew",
          lastName: "Test",
          type: "CLIENT",
          age: 22
        }, (err, _user) => {
          if (err) return done(err);
          user = _user;
          done();
        });
      });

      it('should add a user', done => {

        let data = {
          userId: user.id,
          start: moment().startOf('month').toDate().getTime(),
          end: moment().endOf('month').toDate().getTime()
        };

        agent
          .client()
          .put('/survey/' + survey.id + '/user')
          .query({
            auth: auth.token
          })
          .send(data)
          .expect(201)
          .end(function(err, result) {
            should.not.exist(err);
            let survey = result.body;
            survey.users.length.should.equal(1);
            done();
          });
      });

      it('should not add a user', done => {
        agent
          .client()
          .put('/survey/' + survey.id + '/user')
          .send({})
          .expect(401)
          .end(done);
      });

    });
  });
});
