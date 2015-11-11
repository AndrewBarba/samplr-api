"use strict";

module.exports = () => {
  return (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=UTF-8');
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    next();
  };
};
