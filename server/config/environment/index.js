'use strict';

var _ = require('lodash');
var all = require('./all');

module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {}
);
