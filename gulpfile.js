'use strict';
var gulp = require('gulp');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var htmlImport = require('gulp-html-import');

gulp.task('import', function () {
  gulp.src('src/*.html')
    .pipe(htmlImport('src/common/'))
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream: true}));
})

gulp.task('css', function () {
  gulp.src('src/css/*')
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({stream: true}));
})

gulp.task('images', function () {
  gulp.src('src/images/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(reload({stream: true}));
})

gulp.task("clean", function(){
  return gulp.src(['dist/'])
    .pipe(clean());
})


gulp.task('serve', ['import','css','images'], function() {
  //启动测试服务器
  browserSync.init({
    server: "./dist"
  });

  //src中对应文件修改后，不需要刷新浏览器自动更新浏览器内容
  gulp.watch("src/*.html", ['import']);
  gulp.watch("src/common/*.html", ['import']);
  gulp.watch("src/css/*", ['css']);
});

//gulp默认执行的任务，先清空dist内容，再发布。
gulp.task('default',['clean'] ,function(){
  gulp.start(['serve']);
});