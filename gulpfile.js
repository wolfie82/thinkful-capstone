'use strict';

// Gulp plugins
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gulpinject = require('gulp-inject');
var gulpjshint = require('gulp-jshint');

var wiredep = require('wiredep').stream;
var del = require('del');
var spawn = require('child_process').spawn;
var path = require('path');

var node;
var env = process.env.NODE_ENV || 'development';

/*

Configuration

*/
var config = {
  server: {
    appFiles: 'server/**/*.js',
    script: 'server/app.js'
  },
  client: {
    appFiles: 'client/app/**/*.js',
    styles: {
      less: 'client/app/styles/app.less',
      css: 'client/app/styles/**/*.css'
    },
    index: 'client/index.html'
  }
};

/*

 Hidden tasks

*/



/*

 Tasks

*/
// client
gulp.task('lint:server', function () {
  return gulp.src(config.server.appFiles)
    .pipe(gulpjshint())
    .pipe(gulpjshint.reporter('jshint-stylish'));
});

gulp.task('lint:client', function () {
  return gulp.src(config.client.appFiles)
    .pipe(plugin.jshint())
    .pipe(plugin.jshint.reporter('jshint-stylish'));
});

gulp.task('client:compile:less', function () {
  console.log(env);
  gulp.src(config.client.styles.less)
    .pipe(plugin.less())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('client:inject:css', function () {
  var target = gulp.src(config.client.index);
  var sources = gulp.src(config.client.styles.css, {read: false});

  return target.pipe(gulpinject(sources, {
    transform: function(filePath) {
      filePath = filePath.replace('/client/', '');
      return '<link rel="stylesheet" href="' + filePath + '">';
    }
  }))
    .pipe(gulpif(env === 'development', gulp.dest('.tmp')));
});

gulp.task('wiredep', function () {
  return gulp.src(config.client.index)
    .pipe(wiredep())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('client:autoprefixer', function () {
  return gulp.src('.tmp/app.css')
    .pipe(plugin.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulpif(env === 'development', gulp.dest('.tmp')));

});

// server
gulp.task('watch:server', function () {
  return gulp.watch(config.server.files, ['spawn:server']);
});

gulp.task('spawn:server', function () {
  if (node) {
    node.kill();
  }

  node = spawn('node', [config.server.script], {stdio: 'inherit'});

  node
    .on('close', function(err) {
      if (err === 8) {
        gulp.log('Error detected, waiting for changes...');
      }
    })
    .on('error', function(err) {
      gulp.log(err);
    });
});

// Cleanup tasks
gulp.task('clean:build', function () {
  del(
    [
      '.tmp',
      'dist'
    ]
  );
});

gulp.task('clean:external', function () {
  del(
    [
      'node_modules',
      'client/bower_components'
    ]
  );
});

gulp.task('clean:all', gulp.parallel('clean:external', 'clean:build'));

gulp.task('server:dev', gulp.parallel('clean:build'));

gulp.task('default', gulp.series('server:dev'));

// clean up if an error goes unhandled.
process.on('exit', function () {
  if (node) {
    node.kill();
  }
});
