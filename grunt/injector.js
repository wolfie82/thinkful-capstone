module.exports = {
  options: {},

  js: {
    options: {
      transform: function (filePath) {
        filePath = filePath.replace('/client/app/', 'assets/js/');
        return '<script src="' + filePath + '"></script>';
      },
      starttag: '<!-- injector:js -->',
      endtag: '<!-- endinjector -->'
    },
    files: {
      'client/index.html': [
        [
          'client/{app,components}/**/*.js',
          '!{client/{app,components}/**/*.spec.js',
          '!{client/{app,components}/**/*.mock.js'
        ]
      ]
    }
  },

  less: {
    options: {
      transform: function (filePath) {
        filePath = filePath.replace('/client/app/', '');
        filePath = filePath.replace('/client/components/', '');
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector'
    },
    files: {
      'client/app/app.less': [
        'client/{app,components}/**/*.less',
        '!client/app/app.less'
      ]
    }
  },

  vendorCss: {
    options: {
      transform: function (filePath) {
        filePath = filePath.replace('/client/assets/vendor/styles/css/', 'assets/styles/');
        return '<link rel="stylesheet" href="' + filePath + '" />';
      },
      starttag: '<!-- injector:vendor:css -->',
      endtag: '<!-- endinjector -->'
    },
    files: {
      'client/index.html': [
        'client/assets/vendor/css/**/*.css',
      ]
    }
  }
};
