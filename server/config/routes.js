'use strict';

module.exports = function (api, server) {
  server.route(
    [
      // THING
      { method: 'GET', path: '/api/thing', config: api.thing.controller.index }
    ]
  );
};
