var gulp = require('gulp');
var nano = require('gulp-cssnano');
var less = require('gulp-less');
var zip = require('gulp-zip');
var cssBase64 = require('gulp-css-base64');
var jsonlint = require("gulp-jsonlint");
var runSequence = require('run-sequence');

gulp.task('less', function() {
    return gulp.src('styles/**/*.less')
    	.pipe(less())
    	.pipe(nano())
    	.pipe(gulp.dest('dist/css/'));
});

gulp.task('datatables-css', function() {
    return gulp.src('libs/datatables/media/css/jquery.dataTables.css')
    	.pipe(cssBase64())
   		.pipe(nano())
   		.pipe(gulp.dest('dist/css/'));
});

gulp.task('default', ['less', 'datatables-css']);

gulp.task('manifest_lint', function(){
	return gulp.src("./manifest.json")
	    .pipe(jsonlint())
	    .pipe(jsonlint.reporter());
})

gulp.task('zip', function(){
	return gulp.src([
		'./*',
		'!./node_modules/**/*',
		'!./styles/**/*.less',
		'!./package.json',
		'!./bower.json',
		'!./.bowerrc',
	])
		.pipe(zip('build.zip'))
		.pipe(gulp.dest('./'));
});

gulp.task('build', function(){
    return runSequence(
    	['default', 'manifest_lint'],
		'zip'
	);
});