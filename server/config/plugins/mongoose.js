'use strict';

var mongoose = require('mongoose');

module.exports = function (config) {
  mongoose.connect(config.mongo.uri, config.mongo.options, function (err) {
    if (err) {
      console.log('Unable to connect to MongoDB: ' + err);
      process.exit();
    } else {
      console.log('Connected to MongoDB');
    }
  });
};
