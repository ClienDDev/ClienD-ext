var gulp = require('gulp');
var nano = require('gulp-cssnano');
var less = require('gulp-less');
var zip = require('gulp-zip');
var cssBase64 = require('gulp-css-base64');
var jsonlint = require("gulp-jsonlint");

const lessCliend = function () {
    return gulp.src('styles/cliend.less')
        .pipe(less())
        .pipe(nano())
        .pipe(gulp.dest('dist/css/'));
};

const lessOther = function () {
    return gulp.src([
        'styles/**/*.less',
        '!styles/cliend.less'
    ])
        .pipe(less())
        .pipe(nano())
        .pipe(gulp.dest('dist/css/'));
};

exports.less = gulp.series(lessCliend, lessOther);

const datatablesCss = function () {
    return gulp.src('libs/datatables/media/css/jquery.dataTables.css')
        .pipe(cssBase64())
        .pipe(nano())
        .pipe(gulp.dest('dist/css/'));
};

exports.default = gulp.parallel(exports.less, datatablesCss);

exports.watch = function () {
    gulp.watch([
        'styles/**/*.less',
        '!styles/cliend.less'
    ], ['less-other']);
};

exports.manifestLint = function () {
    return gulp.src("./manifest.json")
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
};

exports.zip = function () {
    return gulp.src([
        './**/*',
        '!./node_modules/**/*',
        '!./node_modules',
        '!./styles/**/*.less',
        '!./gulpfile.js',
        '!./package.json',
        '!./bower.json',
        '!./.bowerrc',
        '!./build.zip'
    ])
        .pipe(zip('build.zip'))
        .pipe(gulp.dest('./'));
};

exports.build = gulp.series(gulp.parallel(exports.default, exports.manifestLint), exports.zip);
