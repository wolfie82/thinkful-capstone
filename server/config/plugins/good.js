'use strict';

module.exports = function (config, server) {
  server.pack.register({
    plugin: require('good'),
    options: config.plugins.good
  }, function (err) {
    if (err) {
      console.log(err);
      return;
    }
  });
};
