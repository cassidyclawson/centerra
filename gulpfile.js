var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    fileinclude = require('gulp-file-include'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat');

//Paths
var paths = {
    html_tempaltes: 'source/templates/',
    scssSource: 'source/stylesheets/',
    cssDestination: 'build/css/'
}

var jsSources = [
   'source/javascripts/typekit.js',
   'source/javascripts/jquery-1.11.3.js',
   'source/javascripts/hoverintent.js',
   'source/javascripts/fastclick.js',
   'source/javascripts/jquery.slicknav.js',
   'source/javascripts/scrollnav.js',
   'source/javascripts/magicline.js',
   'source/javascripts/centerra.js'
]

gulp.task('js', function() {
  return gulp.src(jsSources)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('build/js/'))
    .on('error', gutil.log)
    .pipe(connect.reload());;
});

gulp.task('fileinclude', function() {
    return gulp.src(paths.html_tempaltes + '*.tpl.html')
    .pipe(fileinclude())
    .on('error', gutil.log)
    .pipe(rename({
      extname: ""
    }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());;
});

//Task: Sass
gulp.task('sass', function () {
    return sass(paths.scssSource, {sourcemap: true})
        .on('error', function (err) {
            gutil.log('Error!', err.message);
        })
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(paths.cssDestination))
        .pipe(connect.reload());;
});

//Task: webserver
gulp.task('webserver', function() {
  connect.server({
    root: 'build',
    livereload: true,
    port: 4567
  });
})

//Default task and watch expression
gulp.task('watch', function() {
    gulp.watch(paths.scssSource + '**/*.scss', ['sass']);
    gulp.watch(paths.html_tempaltes + '**/*.html', ['fileinclude']);
    gulp.watch(jsSources, ['js']);
})

gulp.task('default', ['webserver', 'sass', 'fileinclude', 'js', 'watch']);
