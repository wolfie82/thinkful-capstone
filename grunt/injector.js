module.exports = {
  css: {
    options: {
      transform: function(filePath) {
        filePath = filePath.replace('/client/', '');
        filePath = filePath.replace('/.tmp/', '');
        return '<link rel="stylesheet" href="' + filePath + '">';
      },
      starttag: '<!-- injector:css -->',
      endtag: '<!-- endinjector -->'
    },
    files: {
      '<%= yeoman.client %>/index.html': [
        'client/{app,components}/**/*.css'
      ]
    }
  }
}
