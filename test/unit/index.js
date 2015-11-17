"use strict";

process.env.NODE_ENV = 'test';

const requireDirectory = require('require-directory');
const mockDb = require('test/lib/mock-db');

// reset the database
before(done => mockDb.reset(done));

// Start unit tests
it('should run unit tests', () => requireDirectory(module));
