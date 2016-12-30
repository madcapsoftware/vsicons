'use strict'
// dependencies
const gulp = require('gulp'),
    gutil = require('gutil'),
    del = require('del'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-clean-css'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    hasha = require('hasha'),
    merge = require('merge-stream'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync').create();


// compile and bundle css
gulp.task('css', () => {
    let lib = gulp.src(['node_modules/office-ui-fabric-core/dist/css/fabric.min.css'])
        .pipe(concat('lib.css'))
        .pipe(cleancss())
        .pipe(rename({
            basename: 'lib.min',
            extname: '.css'
        }))
        .pipe(gulp.dest('dist/css'));

    let main = gulp.src(['src/_sass/main.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(cleancss())
        .pipe(rename({
            basename: 'main.min',
            extname: '.css'
        }))
        .pipe(gulp.dest('dist/css'));

    return merge(lib, main);
});

// compile and bundle js
gulp.task('js', ['copy'], () => {

    let main = browserify('src/_js/main.js')
        .transform('babelify', {
            presets: ['es2015', 'react']
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(rename({
            basename: 'main.min',
            extname: '.js'
        }))
        .pipe(gulp.dest('dist/js'));

    return merge(main);
});

// copy static assets
gulp.task('copy', () => {
    let json = gulp.src('src/assets/*.json')
        .pipe(gulp.dest('dist'));
    let images = gulp.src('src/assets/*.{png,svg}')
        .pipe(gulp.dest('dist/images'));
    let html = gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    return merge(json, images, html);
});

// clean dist
gulp.task('clean', () => {
    return del('dist');
});

// cachebust
gulp.task('cachebust', ['copy', 'css', 'js'], () => {
    gulp.src(['src/**/*.html'])
        .pipe(replace('@@hash-main-css', hasha.fromFileSync('dist/css/main.min.css')))
        .pipe(replace('@@hash-main-js', hasha.fromFileSync('dist/js/main.min.js')))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['copy', 'css', 'js', 'cachebust'], () => {
    browserSync.init({
        server: './dist'
    });
    gulp.watch('src/**/*.scss', ['css']).on('change', browserSync.reload);
    gulp.watch('src/**/*.js', ['js']).on('change', browserSync.reload);
    gulp.watch('src/**/*.html', ['copy']).on('change', browserSync.reload);
});

gulp.task('build',['copy', 'css', 'js', 'cachebust']);
gulp.task('default', ['build']);
