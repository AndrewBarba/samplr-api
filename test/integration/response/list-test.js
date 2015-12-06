"use strict";

const should = require('should');
const agent = require('test/lib/agent');

// Modules
const Auth = require('modules/auth');
const Response = require('modules/response');

describe('Integration', () => {
  describe('Response', () => {
    describe('List', () => {

      let auth;

      let userData = {
        email: `int_response_list@test.com`,
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
          date: new Date(),
          state: 'READY'
        }, (err, _response) => {
          if (err) return done(err);
          response = _response;
          done();
        });
      });

      it('should list responses', done => {
        agent
          .client()
          .get('/user/' + auth.user.id + '/response')
          .query({
            auth: auth.token
          })
          .expect(200)
          .end(function(err, result) {
            should.not.exist(err);
            let responses = result.body;
            should.exist(responses);
            responses.length.should.equal(1);
            done();
          });
      });

      it('should not list responses', done => {
        agent
          .client()
          .get('/user/' + auth.user.id + '/response')
          .query({
            auth: '1234'
          })
          .expect(401)
          .end(done);
      });

    });
  });
});
