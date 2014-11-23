'use strict';

var Thing = require('./model');

exports.index = {
  handler: function (request, reply) {
    Thing.create({test: 'data'}, function (err, thing) {
      if (err) {
        reply(err);
      }

      reply(thing);
    });
  }
};
