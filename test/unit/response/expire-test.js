"use strict";

const moment = require('moment');
const should = require('should');

// Modules
const Response = require('modules/response');

describe('Unit', () => {
  describe('Response', () => {
    describe('Expire', () => {

      let response1;
      let response2;

      before(done => {
        Response.create({
          userId: '1234',
          surveyId: '1234',
          questionId: '1234',
          state: 'READY',
          date: moment().subtract(10, 'minutes').toDate()
        }, (err, res) => {
          response1 = res;
          done();
        });
      });

      before(done => {
        Response.create({
          userId: '1234',
          surveyId: '1234',
          questionId: '1234',
          state: 'READY',
          date: moment().add(10, 'minutes').toDate()
        }, (err, res) => {
          response2 = res;
          done();
        });
      });

      it('should expire the first response', done => {
        Response.expireByDate(new Date(), (err, res) => {
          should.not.exist(err);
          res.length.should.equal(1);
          done();
        });
      });

      it('should not expire the second response', done => {
        Response.expireByDate(new Date(), (err, res) => {
          should.not.exist(err);
          res.length.should.equal(0);
          done();
        });
      });

    });
  });
});
