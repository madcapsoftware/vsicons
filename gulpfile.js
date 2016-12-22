'use strict'
// dependencies
const gulp = require('gulp'),
    gutil = require('gutil'),
    del = require('del'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
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

// compile pug to html
gulp.task('pug', () => {
    return gulp.src('src/_pug/*.pug')
        .pipe(pug({
            'pretty': true,
            'doctype': 'html'
        }))
        .pipe(gulp.dest('dist'));
});

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
gulp.task('js', ['data'], () => {

    let main = browserify('src/_js/main.js')
        .transform("babelify", {
            presets: ["es2015", "react"]
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

gulp.task('data', () => {
    return gulp.src('src/data/*.json')
        .pipe(gulp.dest('dist'));
});

// clean dist
gulp.task('clean', () => {
    return del('dist');
});

gulp.task('cachebust', ['pug'], () => {
    return gulp.src('dist/index.html')
        .pipe(replace('@@hashLibCSS', hasha('dist/css/lib.min.css')))
        .pipe(replace('@@hashMainCSS', hasha('dist/css/main.min.css')))
        .pipe(replace('@@hashMainJS', hasha('dist/js/main.min.js')))
        .pipe(gulp.dest('dist'));
})

gulp.task('watch', ['data','css','js','pug','cachebust'], () => {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch("src/**/*.scss", ['css']);
    gulp.watch("src/**/*.js", ['js']);
    gulp.watch("src/**/*.(pug|html)", ['pug']);
    gulp.watch("src/**/*.json");
});

gulp.task('default', ['watch']);
