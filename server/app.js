'use strict';

// Bootstrap application
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var env = process.env.NODE_ENV;

var Hapi = require('hapi');
var requireDirectory = require('require-directory');

var config = require('./config/environment');
var server = new Hapi.Server('localhost', config.port);

// Add plugins
requireDirectory(module, './config/plugins', {visit: function(obj) {
  obj(config, server);
}});

// Add routes
var api = requireDirectory(module, './api/', {include: /controller\.js$/});
require('./config/routes')(api, server);

// Add static routes / assets
server.route({
  method: 'GET',
  path: '/public/assets/css/{param*}',
  handler: {
    directory: {
      path: '.tmp/public/assets/css',
      listing: false,
      index: false,
      showHidden: false,
      redirectToSlash: true
    }
  }
});

server.route({
  method: 'GET',
  path: '/public/assets/js/{param*}',
  handler: {
    directory: {
      path: 'client/app/scripts',
      listing: false,
      index: false,
      showHidden: false,
      redirectToSlash: true
    }
  }
});

server.route({
  method: 'GET',
  path: '/public/assets/img/{param*}',
  handler: {
    directory: {
      path: 'client/app/images',
      listing: false,
      index: false,
      showHidden: false,
      redirectToSlash: true
    }
  }
});

server.route({
  method: 'GET',
  path: '/bower_components/{param*}',
  handler: {
    directory: {
      path: 'client/bower_components',
      listing: false,
      index: false,
      showHidden: false,
      redirectToSlash: true
    }
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: {
    file: {
      path: '.tmp/public/index.html'
    }
  }
});


// Start
server.start();
