var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    fileinclude = require('gulp-file-include'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util');

//Paths
var paths = {
    html_tempaltes: 'source/templates/',
    scssSource: 'source/stylesheets/',
    cssDestination: 'build/css/'
}

gulp.task('fileinclude', function() {
    return gulp.src(paths.html_tempaltes + '*.tpl.html')
    .pipe(fileinclude())
    .pipe(rename({
      extname: ""
    }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest('build'));
});

//Task: Sass
gulp.task('sass', function () {
    return sass(paths.scssSource, {sourcemap: true})
        .on('error', function (err) {
            gutil.log('Error!', err.message);
        })
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(paths.cssDestination));
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
    gulp.watch(paths.scssSource + '*.scss', ['sass']);
    gulp.watch(paths.scssSource + 'partials/*.scss', ['sass']);
})

gulp.task('default', ['webserver', 'sass', 'watch']);
