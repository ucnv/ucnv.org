var gulp = require('gulp'),
    del = require('del'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    addsrc = require('gulp-add-src'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    filter = require('gulp-filter'),
    ejs = require("gulp-ejs"),
    uglify = require('gulp-uglify'),
    webpack = require("webpack-stream");

var publishdir = 'public/';
var mainjs = 'src/lib/main.js';
var mainscss = 'src/lib/main.scss';
var templates = 'src/html/**/*.ejs';
var assets = 'src/html/**/*.{css,js,png,jpg,pdf,mp4}';

var print = require('gulp-print');
gulp.task('compile-html', function() {
  gulp.src(templates)
    .pipe(filter(['**/*', '!src/html/_*']))
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(publishdir));

  gulp.src(assets)
    .pipe(gulp.dest(publishdir));
});

gulp.task('compile-js', function(callback) {
  return gulp.src(mainjs)
    .pipe(webpack())
    .pipe(concat('a.js'))
    .pipe(gulp.dest('src/lib'))
  //  .pipe(concat('a.min.js'))
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest(publishdir + 'assets'));
});

gulp.task('compile-sass', function() {
  gulp.src(mainscss)
    .pipe(sass({ errLogToConsole: true }))
    .pipe(rename('a.css'))
    .pipe(gulp.dest('src/lib'))
    .pipe(addsrc.prepend(['src/lib/normalize.css']))
    .pipe(minifyCSS())
    .pipe(concat('a.css'))
    .pipe(gulp.dest(publishdir + 'assets'));
});

gulp.task('clean', function(callback) {
  del([publishdir + '**/.DS_Store'], callback);
});

gulp.task('watch-html', function() {
  gulp.watch([templates], function(event) {
    gulp.run('compile-html');
  });
});

gulp.task('watch-js', function() {
  gulp.watch([mainjs], function(event) {
    gulp.run('compile-js');
  });
});

gulp.task('watch-sass', function() {
  gulp.watch([mainscss], function(event) {
    gulp.run('compile-sass');
  });
});


gulp.task('compile', ['compile-html', 'compile-js', 'compile-sass', 'clean']);
gulp.task('default', ['compile', 'watch-html', 'watch-js', 'watch-sass']);
