module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt, {
    jitGrunt: true
  });

  // ** DEFAULT Run development server
  grunt.registerTask('default', function () {
    grunt.task.run([
      'clean:dev',
      'env:local',
      'injector:less',
      'less',
      'injector:js',
      'injector:vendorCss',
      'wiredep',
      'autoprefixer'
    ]);
  })
};
