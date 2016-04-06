"use strict";

const ENV = process.env.NODE_ENV || 'local';
const _ = require('underscore');
const pkg = require('../../package');

/* ------------------------------------------------------------------------- *
 * Default
 * ------------------------------------------------------------------------- */

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
  },
  push: {
    apn: {
      gateway: 'gateway.push.apple.com',
      cert: 'static/certificates/apple/cert.pem',
      key: 'static/certificates/apple/key.pem'
    },
    gcm: {
      key: process.env.GCM_KEY
    }
  }
};

/* ------------------------------------------------------------------------- *
 * Production
 * ------------------------------------------------------------------------- */

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

/* ------------------------------------------------------------------------- *
 * Development
 * ------------------------------------------------------------------------- */

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

/* ------------------------------------------------------------------------- *
 * Local
 * ------------------------------------------------------------------------- */

const LOCAL = _.extend({}, DEVELOPMENT, {
  ENV_LOCAL: true,
  logger: {
    level: 'debug'
  },
  rethinkdb: {
    host: 'aws-us-east-1-portal.2.dblayer.com',
    port: 10511,
    db: 'development',
    authKey: process.env.RETHINKDB_AUTH_KEY || 'localhost',
    ssl: {
      rejectUnauthorized: false
    }
  }
});

/* ------------------------------------------------------------------------- *
 * Test
 * ------------------------------------------------------------------------- */

const TEST = _.extend({}, DEVELOPMENT, {
  ENV_TEST: true,
  logger: {
    level: 'debug'
  },
  rethinkdb: {
    host: process.env.RETHINKDB_PORT_29015_TCP_ADDR || 'ec2-54-187-250-137.us-west-2.compute.amazonaws.com'
  }
});

/* ------------------------------------------------------------------------- *
 * Expose
 * ------------------------------------------------------------------------- */

module.exports = {
  production: PRODUCTION,
  development: DEVELOPMENT,
  local: LOCAL,
  test: TEST
}[ENV];
