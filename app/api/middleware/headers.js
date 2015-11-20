"use strict";

const HEADERS = {
  CONTENT_TYPE: {
    key: 'Content-Type',
    value: 'application/json; charset=UTF-8'
  },
  CACHE_CONTROL: {
    key: 'Cache-Control',
    value: 'private, no-cache, no-store, must-revalidate'
  },
  PRAGMA: {
    key: 'Pragma',
    value: 'no-cache'
  }
};

module.exports = () => {
  return (req, res, next) => {
    res.header(HEADERS.CONTENT_TYPE.key, HEADERS.CONTENT_TYPE.value);
    res.header(HEADERS.CACHE_CONTROL.key, HEADERS.CACHE_CONTROL.value);
    res.header(HEADERS.PRAGMA.key, HEADERS.PRAGMA.value);
    next();
  };
};
