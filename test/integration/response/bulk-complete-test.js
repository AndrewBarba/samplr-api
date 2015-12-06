"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');
const Response = require('modules/response');

describe('Integration', () => {
  describe('Response', () => {
    describe('Bulk Complete', () => {

      let auth;

      let userData = {
        email: `int_response_bulk_complete@test.com`,
        password: "xxx123",
        firstName: "Andrew",
        lastName: "Test",
        type: "CLIENT",
        age: 22
      };

      before(done => {
        Auth.register(userData, (err, _auth) => {
          if (err) return done(err);
          auth = _auth;
          done();
        });
      });

      let response;

      before(done => {
        Response.create({
          userId: auth.user.id,
          surveyId: '1234',
          questionId: '1234',
          date: new Date()
        }, (err, _response) => {
          if (err) return done(err);
          response = _response;
          done();
        });
      });

      it('should complete a response', done => {

        let completeData = {
          responses: [{
            id: response.id,
            value: parseInt(Math.random() * 100)
          }]
        };

        agent
          .client()
          .put('/user/' + auth.user.id + '/response')
          .query({
            auth: auth.token
          })
          .send(completeData)
          .expect(200)
          .end(function(err, result) {
            should.not.exist(err);
            let responses = result.body;
            should.exist(responses);
            responses[0].value.should.equal(completeData.responses[0].value);
            responses[0].state.should.equal('COMPLETE');
            done();
          });
      });

      it('should not complete a response', done => {

        let completeData = {
          responses: [{
            id: response.id,
            value: parseInt(Math.random() * 100)
          }]
        };

        agent
          .client()
          .put('/user/' + auth.user.id + '/response')
          .query({
            auth: '1234'
          })
          .send(completeData)
          .expect(401)
          .end(done);
      });

    });
  });
});
