//https://github.com/gulpjs/gulp/blob/master/docs/recipes/incremental-builds-with-concatenate.md
//Incremental rebuilding, including operating on full file sets

var gulp = require('gulp');
var header = require('gulp-header');
var footer = require('gulp-footer');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var cached = require('gulp-cached');
var remember = require('gulp-remember');

var scriptGlob = 'src/**/*.js';

gulp.task('script', function(){
	return gulp.src(scriptGlob)
	.pipe(cached('scripts'))
	.pipe(jshint())
	.pipe(header('(function () {'))
	.pipe(footer('})();'))
	.pipe(remember('scripts'))
	.pipe(concat('app.js'))
	.pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){
	var watcher = gulp.watch(scriptGlob, ['script']);

	watcher.on('change', function(event){
		if(event.type == 'deleted'){
			delete cached.caches.scripts[event.path];
			remember.forget('scripts', event.path);
		}
	})
});