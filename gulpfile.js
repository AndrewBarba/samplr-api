"use strict";

const gulp = require('gulp');
const jshint = require('gulp-jshint');

const lintSources = [
  '*.js',
  'app/**/*.js',
  'process/**/*.js',
  'test/**/*.js'
];

gulp.task('jshint', () => {
  return gulp
    .src(lintSources)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['jshint']);
