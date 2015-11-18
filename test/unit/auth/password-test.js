"use strict";

const should = require('should');
const bcrypt = require('bcrypt');

describe('Unit', () => {
  describe('Auth', () => {
    describe('Password', () => {

      it('should hash a password', done => {
        let password = "12345";
        bcrypt.hash(password, 10, (err, hash) => {
          should.not.exist(err);
          hash.should.not.equal(password);
          done();
        });
      });

    });
  });
});
