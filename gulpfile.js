var gulp = require('gulp'),
    connect = require('gulp-connect'),
    gutil = require('gulp-util'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

//Paths
var scssSource = 'components/stylesheets/',
    cssDestination = 'source/css/';

//Task: Sass
gulp.task('sass', function () {
    return sass(scssSource, {sourcemap: true})
        .on('error', function (err) {
            gutil.log('Error!', err.message);
        })
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(cssDestination));
});

//Task: webserver
gulp.task('webserver', function() {
  connect.server({
    root: 'source',
    livereload: true,
    port: 4567
  });
})

//Default task and watch expression
gulp.task('watch', function() {
  gulp.watch(scssSource + '*.scss', ['sass']);
})

gulp.task('default', ['webserver', 'sass', 'watch']);
