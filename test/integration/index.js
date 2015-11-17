"use strict";

process.env.NODE_ENV = 'test';

const requireDirectory = require('require-directory');
const agent = require('test/lib/agent');
const mockDb = require('test/lib/mock-db');

// reset the database
before(done => mockDb.reset(done));

// start the server
before(done => agent.start(done));

// Start integration tests
it('should run integration tests', () => requireDirectory(module));
