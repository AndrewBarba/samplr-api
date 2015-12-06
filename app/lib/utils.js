"use strict";

const crypto = require('crypto');

class Utils {

  /**
   * Produces a random string of alphanumeric characters
   *
   * @method randomHex
   * @param {Integer} number
   * @return {String}
   */
  randomHex(length) {
    let num = Math.ceil(length / 2);
    let odd = length % 2 !== 0;
    let buf = crypto.pseudoRandomBytes(num);
    let hexVal = buf.toString('hex');
    return odd ? hexVal.substring(1) : hexVal;
  }
}

module.exports = new Utils();
