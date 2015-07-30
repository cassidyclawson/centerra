var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    fileinclude = require('gulp-file-include'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    minifyHTML = require('gulp-minify-html');

var outputDir, sassStyle, env;

// use [gulp --production] for output in production folder
if (argv.production) {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
  env = 'production';
} else {
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
  env = 'development';
}

//Paths
var paths = {
    html_tempaltes: 'source/templates/',
    scssSource: 'source/stylesheets/',
    imagesSource: 'source/images/'
}

var jsSources = [
   'source/javascripts/typekit.js',
   'source/javascripts/jquery-1.11.3.js',
   'source/javascripts/hoverintent.js',
   'source/javascripts/fastclick.js',
   'source/javascripts/jquery.slicknav.js',
   'source/javascripts/scrollnav.js',
   'source/javascripts/jquery.validate.js',
   'source/javascripts/magicline.js',
   'source/javascripts/jquery.textfill.min.js',
   'source/javascripts/centerra.js'
]

gulp.task('js', function() {
  return gulp.src(jsSources)
    .pipe(concat('all.js'))
    .pipe(gulpif(env === 'production', uglify()))
    .on('error', function (err) {
        gutil.log('Error!', err.message);
    })
    .pipe(gulp.dest(outputDir + 'js/'))
    .pipe(connect.reload());;
});

gulp.task('htmlinclude', function() {
    return gulp.src(paths.html_tempaltes + '*.tpl.html')
    .pipe(fileinclude())
    .on('error', gutil.log)
    .pipe(rename({
      extname: ""
    }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());;
});

//Task: Sass
gulp.task('sass', function () {
    return sass(paths.scssSource, { sourcemap: true,
                                    style: sassStyle
                                  })
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulpif(env === 'development', sourcemaps.write('../maps')))
        .on('error', function (err) {
            gutil.log('Error!', err.message);
        })
        .pipe(gulp.dest(outputDir + 'css/'))
        .pipe(connect.reload());;
});

gulp.task('fonts', function() {
    return gulp.src(paths.scssSource+'fonts/*')
          .pipe(gulp.dest(outputDir + 'css/fonts/'));
});

gulp.task('images', function() {
  gulp.src(paths.imagesSource + '*')
    .pipe(gulpif(env === 'production', imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngcrush()]
    })))
    .pipe(gulp.dest(outputDir + 'images'))
    .pipe(connect.reload())
});

//Task: webserver
gulp.task('webserver', function() {
  connect.server({
    root: outputDir,
    livereload: true,
    port: 4567
  });
})

//Default task and watch expression
gulp.task('watch', function() {
    gulp.watch(paths.scssSource + '**/*.scss', ['sass']);
    gulp.watch(paths.html_tempaltes + '**/*.html', ['htmlinclude']);
    gulp.watch(jsSources, ['js']);
})

gulp.task('default', ['htmlinclude', 'sass', 'js', 'fonts', 'images', 'webserver', 'watch']);
