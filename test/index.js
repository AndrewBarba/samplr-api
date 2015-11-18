"use strict";

process.env.NODE_ENV = 'test';

// Start the tests
require('./unit');
require('./integration');
