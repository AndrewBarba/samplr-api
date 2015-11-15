"use strict";

const ENV = process.env.NODE_ENV || 'local';
const _ = require('underscore');
const pkg = require('../../package');

const DEFAULTS = {
  app: {
    author: pkg.author,
    description: pkg.description,
    name: pkg.name,
    url: pkg.url,
    version: pkg.version
  },
  env: ENV,
  http: {
    port: process.env.PORT || 3000
  }
};

const PRODUCTION = _.extend({}, DEFAULTS, {
  ENV_PROD: true,
  logger: {
    level: 'error'
  },
  rethinkdb: {
    host: 'aws-us-east-1-portal.2.dblayer.com',
    port: 10511,
    db: 'production',
    authKey: process.env.RETHINKDB_AUTH_KEY,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const DEVELOPMENT = _.extend({}, DEFAULTS, {
  ENV_DEV: true,
  logger: {
    level: 'debug'
  },
  rethinkdb: {
    host: 'aws-us-east-1-portal.2.dblayer.com',
    port: 10511,
    db: 'development',
    authKey: process.env.RETHINKDB_AUTH_KEY,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const LOCAL = _.extend({}, DEVELOPMENT, {
  ENV_LOCAL: true,
  logger: {
    level: 'debug'
  },
  rethinkdb: {
    host: 'aws-us-east-1-portal.2.dblayer.com',
    port: 10511,
    db: 'development',
    authKey: 'skirmNQlg18q5xUbU54xNN0neQRgeRP1UD2HCa8iSZE',
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const TEST = _.extend({}, DEVELOPMENT, {
  ENV_TEST: true,
  logger: {
    level: 'debug'
  },
  rethinkdb: {
    host: 'aws-us-east-1-portal.2.dblayer.com',
    port: 10511,
    db: 'test',
    authKey: 'skirmNQlg18q5xUbU54xNN0neQRgeRP1UD2HCa8iSZE',
    ssl: {
      rejectUnauthorized: false
    }
  }
});

module.exports = {
  'production': PRODUCTION,
  'development': DEVELOPMENT,
  'local': LOCAL,
  'test': TEST
}[ENV];
