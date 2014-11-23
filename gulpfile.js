'use strict';

var gulp = require('gulp');
var del = require('del');
var plugin = require('gulp-load-plugins')();
var spawn = require('child_process').spawn;
var node;

var config = {
  server: {
    files: 'server/**/*.js',
    script: 'server/app.js'
  },
  client: {
    dist: 'dist/**'
  }
};

gulp.task('lintServer', function() {
  return gulp.src(config.server.files)
    .pipe(plugin.eslint())
    .pipe(plugin.eslint.format())
    .pipe(plugin.eslint.failOnError());
});

gulp.task('watchServer', function() {
  return gulp.watch(config.server.files, ['server']);
});

gulp.task('spawnServer', function () {
  if (node) {
    node.kill();
  }

  node = spawn('node', [config.server.script], {stdio: 'inherit'});

  node
    .on('close', function (err) {
      if (err === 8) {
        gulp.log('Error detected, waiting for changes...');
      }
    })
    .on('error', function(err) {
      gulp.log(err);
    });
});

gulp.task('clean:client', function () {
  del(config.client.dist);
});


gulp.task('server', gulp.parallel('lintServer', 'watchServer', 'spawnServer'));

// clean up if an error goes unhandled.
process.on('exit', function() {
  if (node) {
    node.kill();
  }
});
