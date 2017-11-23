/*
  Default gulp file
  with all general tasks like build & watch
  everything else should be moved in separate files
*/
var config = require('../gulpconfig');

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence');

gulp.task('default',['serve']);

gulp.task('build', function(callback) {
  runSequence(
    'build:clean',
    [
      'metalsmith',
      'sass',
      'scripts',
      'images'
    ],
    'minifyHTML',
    'purifyCSS',
    'minifyCSS',
    'minifyJS',
    'minifySVG',
    // 'minifyImages',
    // 'criticalCSS',
    // 'publish',
    // 'slack',
    callback);
});

gulp.task('build:dev', function(callback) {
  runSequence(
    'build:clean',
  [
    'metalsmith',
    'sass',
    'scripts',
    'images',
  ],
  [
    'metalsmith:watch',
    'sass:watch',
    'scripts:watch',
    // 'images:watch',
    // 'lintHTML:watch'
  ],
  callback);
});

gulp.task('build:clean', function() {
	return gulp.src('build/*', {read: false}).pipe(clean());
});
