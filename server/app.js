'use strict';

// Bootstrap application
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

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

// Start
server.start();
