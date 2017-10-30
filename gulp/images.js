// Load config variables from ../gulpconfig.js
var config = require('../gulpconfig').images;

var gulp = require('gulp'),
    runSequence = require('run-sequence');


gulp.task('imgs', function () {
  return gulp.src(config.src.imgs)
    .pipe(gulp.dest(config.dest.imgs))
});
gulp.task('icons', function () {
  return gulp.src(config.src.icons)
    .pipe(gulp.dest(config.dest.icons))
});
gulp.task('images', function (callback) {
  runSequence('imgs', 'icons', callback);
});

gulp.task('images:watch', function () {
  gulp.watch(config.src.root, ['images']);
});
