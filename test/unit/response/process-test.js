"use strict";

const moment = require('moment');
const should = require('should');

// Modules
const Response = require('modules/response');

describe('Unit', () => {
  describe('Response', () => {
    describe('Process', () => {

      let response1;
      let response2;

      before(done => {
        Response.create({
          userId: '1234',
          surveyId: '1234',
          questionId: '1234',
          state: Response.STATE.PENDING,
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
          state: Response.STATE.PENDING,
          date: moment().add(10, 'minutes').toDate()
        }, (err, res) => {
          response2 = res;
          done();
        });
      });

      it('should process the first response', done => {
        Response.processByDate(new Date(), (err, res) => {
          should.not.exist(err);
          res.length.should.equal(1);
          res[0].state.should.equal(Response.STATE.READY);
          done();
        });
      });

      it('should not process the second response', done => {
        Response.processByDate(new Date(), (err, res) => {
          should.not.exist(err);
          res.length.should.equal(0);
          done();
        });
      });

    });
  });
});
