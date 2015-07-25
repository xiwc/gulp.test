var gulp = require('gulp');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
// var newer = require('gulp-newer');
var changed = require('gulp-changed');
// var runSequence = require('run-sequence');
var minifyCss = require('gulp-minify-css');
// var uglifycss = require('gulp-uglifycss');
var browserSync = require('browser-sync').create();
var vinylPaths = require('vinyl-paths');

// 清理打包目录
gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(vinylPaths(del));
});
// 不做中间处理,直接复制文件到打包目录
gulp.task('copy', ['clean'], function() {

    return gulp.src(['src/**', '!src/**/*.js', '!src/**/*.css']).pipe(gulp.dest('dist'));
});
// 对js文件做压缩并且生成sourcemaps处理,处理结果复制到打包目录
gulp.task('js', ['clean'], function() {

    gulp.src('src/**/*.js')
        .pipe(gulp.dest('dist/src'))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write({
            includeContent: false,
            sourceRoot: '/src'
        }))
        .pipe(gulp.dest('dist'));
});
// 对css文件做压缩并且生成sourcemaps处理,处理结果复制到打包目录
gulp.task('css', ['clean'], function() {
    gulp.src('src/**/*.css')
        .pipe(gulp.dest('dist/src'))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(minifyCss())
        .pipe(sourcemaps.write({
            includeContent: false,
            sourceRoot: '/src'
        }))
        .pipe(gulp.dest('dist'));
});
// 定义gulp build task: `gulp build`
gulp.task('build', ['copy', 'js', 'css']);
// 定义gulp serve task: `gulp serve`
gulp.task('serve', ['build'], function() {

    browserSync.init({
        open: true,
        server: {
            baseDir: 'dist'
        },
        startPath: "index.html"
    });

    gulp.watch(['src/**', '!src/**/*.js', '!src/**/*.css'], ['copy-changed', browserSync.reload])
        .on('change', log);
    gulp.watch('src/**/*.js', ['js-changed', browserSync.reload])
        .on('change', log);
    gulp.watch('src/**/*.css', ['css-changed', browserSync.reload])
        .on('change', log);
});
// 不做处理,直接复制更新的文件到打包目录
gulp.task('copy-changed', function() {
    return gulp.src(['src/**', '!src/**/*.js', '!src/**/*.css'])
        .pipe(changed('dist'))
        .pipe(gulp.dest('dist'));
});
// 对js文件做压缩并且生成sourcemaps处理,处理结果复制到打包目录
gulp.task('js-changed', function() {

    gulp.src('src/**/*.js')
        .pipe(changed('dist'))
        .pipe(gulp.dest('dist/src'))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write({
            includeContent: false,
            sourceRoot: '/src'
        }))
        .pipe(gulp.dest('dist'));
});
// 对css文件做压缩并且生成sourcemaps处理,处理结果复制到打包目录
gulp.task('css-changed', function() {
    gulp.src('src/**/*.css')
        .pipe(changed('dist'))
        .pipe(gulp.dest('dist/src'))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(minifyCss())
        .pipe(sourcemaps.write({
            includeContent: false,
            sourceRoot: '/src'
        }))
        .pipe(gulp.dest('dist'));
});

function log(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// 执行 `gulp` 默认执行任务
gulp.task('default', ['serve']);

/**
- 文件的copy to dist
- server的启动
- 文件更新监视,copy to dist,reload server.

## TODO
- js压缩
- css压缩
- sourceMaps生成

**/

// 以下为测试代码
// 测试gulp.watch [task...]的参数类型和执行顺序
gulp.task('test', function() {

    gulp.watch('src/**', ['test1', 'test2', func]).on('change', function() {
        console.log('watch changed');
    })
});

gulp.task('test1', function() {
    console.log('test1 task');
    for (var i = 0; i < 1000; i++) {
        console.log('' + i);
    }
});

gulp.task('test2', function() {
    console.log('test2 task');
    for (var i = 0; i < 1000; i++) {
        console.log('' + i);
    }
});

function func() {
    console.log('func function');
}
