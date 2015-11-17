
const requireDirectory = require('require-directory');

// Start the tests
requireDirectory(module, './unit');
requireDirectory(module, './integration');
