const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('../webpack.config.js');

gulp.task('scripts', ['copy'], () => (
  gulp.src('src/_js/main.jsx')
      .pipe(webpackStream(webpackConfig), webpack)
      .pipe(gulp.dest('dist/js'))
));
