'use strict';
var path = require('path');

module.exports = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(path.join(__dirname,'/../../..')),

  // Server port
  port: process.env.PORT || 9000,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'core-secret'
  },

  // Plugins
  plugins: {
    good: {
      opsInterval: 10000,
      reporters: [{
        reporter: require('good-console'),
        args: [
          {
            log: '*',
            request: '*',
            ops: '*',
            error: '*'
          }
        ]
      }]
    }
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }

};
