//Combining streams to handle errors
//https://github.com/gulpjs/gulp/blob/master/docs/recipes/combining-streams-to-handle-errors.md
var combiner = require('stream-combiner2');
var uglify = require('gulp-uglify');
var gulp = require('gulp');


gulp.task('error', function(){
	var cb = combiner.obj([
		gulp.src('src/**/*.js'),
		uglify(),
		gulp.dest('dist')]);

	cb.on('error', console.error.bind(console));

	return cb;
})