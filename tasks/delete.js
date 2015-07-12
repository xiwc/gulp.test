// Delete files and folders
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
var gulp = require('gulp');
var del = require('del');

gulp.task('delete', function(cb){
	del([
		'dist/test.txt',
		'dist/test/**/*',
		'!dist/test/test.txt'], cb)
});

// Delete files in a pipeline

var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug'); // only as an example
var del = require('del');
var vinylPaths = require('vinyl-paths');

gulp.task('delete2', function(){
	return gulp.src('dist/*')
	.pipe(stripDebug())
	.pipe(gulp.dest('dist'))
	.pipe(vinylPaths(del));
});