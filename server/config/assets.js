'use strict';

module.exports = function(server) {
  // CSS
  server.route({
    method: 'GET',
    path: '/assets/css/{param*}',
    handler: {
      directory: {
        path: ['.tmp/assets/css', 'client/vendor/css'],
        listing: false,
        index: false,
        showHidden: false,
        redirectToSlash: true
      }
    }
  });

  // Javascript
  server.route({
    method: 'GET',
    path: '/assets/js/{param*}',
    handler: {
      directory: {
        path: 'client/app',
        listing: false,
        index: false,
        showHidden: false,
        redirectToSlash: true
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/js/controllers/{param*}',
    handler: {
      directory: {
        path: 'client/app/controllers',
        listing: false,
        index: false,
        showHidden: false,
        redirectToSlash: true
      }
    }
  });

  // Images
  server.route({
    method: 'GET',
    path: '/assets/images/{param*}',
    handler: {
      directory: {
        path: 'client/assets/images',
        listing: false,
        index: false,
        showHidden: false,
        redirectToSlash: true
      }
    }
  });

  // Views
  server.route({
    method: 'GET',
    path: '/assets/templates/layouts/{param*}',
    handler: {
      directory: {
        path: ['client/app/layouts'],
        listing: true,
        index: true,
        showHidden: false,
        redirectToSlash: false
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/assets/templates/components/{param*}',
    handler: {
      directory: {
        path: ['client/app/components'],
        listing: true,
        index: true,
        showHidden: false,
        redirectToSlash: false
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/l10n/{param*}',
    handler: {
      directory: {
        path: 'client/app/l10n',
        listing: false,
        index: false,
        showHidden: false,
        redirectToSlash: true
      }
    }
  });

  // Bower (DEV)
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

  // index.html or /
  server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: {
        path: 'client/index.html'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/index.html',
    handler: {
      file: {
        path: 'client/index.html'
      }
    }
  });
}
