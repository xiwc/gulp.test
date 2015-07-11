var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var del = require('del');

gulp.task('clean', function() {
    del.sync(['build']);
});

gulp.task('build', ['clean'], function() {

    gulp.src('client/js/**/*.js', {
        base: 'client'
    }).pipe(babel()).pipe(uglify()).pipe(gulp.dest('build'));

    gulp.src('client/**/*.html', {
        base: 'client'
    }).pipe(gulp.dest('build'));

    gulp.src('client/lib/**/*.*', {
        base: 'client'
    }).pipe(gulp.dest('build'));
});

gulp.task('default', ['build']);
