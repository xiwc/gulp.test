//https://github.com/gulpjs/gulp/blob/master/docs/recipes/only-pass-through-changed-files.md
//Only pass through changed files

var gulp = require('gulp');
var changed = require('gulp-changed');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');

// we define some constants here so they can be reused
var SRC = 'src/*.js';
var DEST = 'dist';

gulp.task('default', function() {
    return gulp.src(SRC)
        // the `changed` task needs to know the destination directory
        // upfront to be able to figure out which files changed
        .pipe(changed(DEST))
        // only files that has changed will pass through here
        .pipe(jscs())
        .pipe(uglify())
        .pipe(gulp.dest(DEST));
});