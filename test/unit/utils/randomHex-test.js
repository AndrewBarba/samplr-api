"use strict";

const _ = require('underscore');
const should = require('should');
const utils = require('lib/utils');

describe('Unit', () => {
  describe('Utils', () => {
    describe('Random Hex', () => {

      it('should generate random strings', () => {
        let strings = {};
        _.times(10000, () => {
          let string = utils.randomHex(64);
          should.not.exist(strings[string]);
          strings[string] = true;
        });
      });

    });
  });
});
