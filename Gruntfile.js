module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt, {
    jitGrunt: true
  });

  // ** DEFAULT Run development server
  grunt.registerTask('default', function () {
    grunt.task.run([
      'clean:dev',
      'env:all',
      'injector:less',
      'concurrent:server',
      'injector',
      'wiredep',
      'autoprefixer',
      'express:dev',
      'wait',
      'open',
      'watch'
    ]);
  })
};
