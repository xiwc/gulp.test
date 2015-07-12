//https://github.com/gulpjs/gulp/blob/master/docs/recipes/rebuild-only-files-that-change.md
//Rebuild only files that change

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

gulp.task('default', function() {
  return gulp.src('sass/*.scss')
    .pipe(watch('sass/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest('dist'));
});