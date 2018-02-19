const gulp = require('gulp');
const browserify = require('browserify');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');

gulp.task('scripts', ['copy'], () => (
  browserify('src/_js/main.jsx')
      .transform('babelify', {
        presets: ['env', 'react'],
      })
      .bundle()
      .pipe(source('main.jsx'))
      .pipe(rename({
        basename: 'main.min',
        extname: '.js',
      }))
      .pipe(gulp.dest('dist/js'))
));
