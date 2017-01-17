'use strict';

// dependencies
const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleancss = require('gulp-clean-css');
const browserify = require('browserify');
const hasha = require('hasha');
const merge = require('merge-stream');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();

// compile and bundle css
gulp.task('css', () => {
  const lib = gulp.src(['node_modules/office-ui-fabric-react/dist/css/fabric.min.css'])
      .pipe(concat('lib.css'))
      .pipe(cleancss())
      .pipe(rename({
        basename: 'lib.min',
        extname: '.css',
      }))
      .pipe(gulp.dest('dist/css'));

  const main = gulp.src(['src/_sass/main.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(cleancss())
      .pipe(rename({
        basename: 'main.min',
        extname: '.css',
      }))
      .pipe(gulp.dest('dist/css'));

  return merge(lib, main);
});

// compile and bundle js
gulp.task('js', ['copy'], () => {
  const main = browserify('src/_js/main.js')
      .transform('babelify', {
        presets: ['es2015', 'react'],
      })
      .bundle()
      .pipe(source('main.js'))
      .pipe(rename({
        basename: 'main.min',
        extname: '.js',
      }))
      .pipe(gulp.dest('dist/js'));
  return merge(main);
});

// copy static assets
gulp.task('copy', () => {
  const json = gulp.src('src/assets/*.json')
      .pipe(gulp.dest('dist'));
  const images = gulp.src('src/assets/*.{png,svg}')
      .pipe(gulp.dest('dist/images'));
  const html = gulp.src('src/*.html')
      .pipe(gulp.dest('dist'));
  const webconfig = gulp.src('src/Web.config')
      .pipe(gulp.dest('dist'));
  return merge(json, images, html, webconfig);
});

// clean dist
gulp.task('clean', () => del('dist'));

// cachebust
gulp.task('cachebust', ['copy', 'css', 'js'], () => {
  gulp.src(['src/**/*.html'])
      .pipe(replace('@@hash-main-css', hasha.fromFileSync('dist/css/main.min.css')))
      .pipe(replace('@@hash-main-js', hasha.fromFileSync('dist/js/main.min.js')))
      .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['copy', 'css', 'js', 'cachebust'], () => {
  browserSync.init({
    server: './dist',
  });
  gulp.watch('src/**/*.scss', ['css']).on('change', browserSync.reload);
  gulp.watch('src/**/*.js', ['js']).on('change', browserSync.reload);
  gulp.watch('src/**/*.html', ['copy']).on('change', browserSync.reload);
});

gulp.task('build', ['copy', 'css', 'js', 'cachebust']);
gulp.task('default', ['build']);
