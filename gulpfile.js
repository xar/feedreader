var gulp        = require('gulp');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var path = require('path');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var imageop = require('gulp-image-optimization');
function swallowError (error) {
    //If you want details of the error in the console
    console.log(error.toString());
    this.emit('end');
}
// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('assets/sass/**/*.scss')
        .pipe(sass({ style: 'expanded'}))
        .on('error', swallowError)
        .pipe(autoprefixer('last 10 version', 'safari 5', 'ie 8', 'ie 9', 'opera 11.1'))
        .pipe(gulp.dest('public/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./public/css'))
        .pipe(reload({stream:true}));
});


gulp.task('js', function(){
  return gulp.src('./assets/js/**')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js/'))
    .on('error', swallowError)
    .pipe(reload({stream:true}));
});

gulp.task('watch', function(){

});

gulp.task('images', function(cb) {
    gulp.src(['images-src/**/*.png','images-src/**/*.jpg','images-src/**/*.gif','images-src/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('images')).on('end', cb).on('error', cb);
});

gulp.task('buildCSS', function(){
    return gulp.src(['stylesheets/bootstrap.min.css', 'stylesheets/animate.min.css', 'stylesheets/slick.css', 'js/fancybox/jquery.fancybox.css', 'stylesheets/screen.css'])
            .pipe(concat('site.css'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss({}))
            .pipe(gulp.dest('dist/'));
});

gulp.task('buildJS', function(){
    return gulp.src(['js/retina.min.js', 'js/waypoints.min.js', 'js/slick.min.js', 'js/fancybox/jquery.fancybox.pack.js', 'js/site.js'])
            .pipe(concat('site.js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
});
gulp.task('lara', function(){
  return gulp.src('./templates/**')
    .on('error', swallowError)
    .pipe(reload({stream:true}));
});

gulp.task('build', function(){
    runSequence('compass', 'buildCSS', 'buildJS', 'images', function() {
        console.log('Build completed');
    });
});
// Default task to be run with `gulp`
gulp.task('default', ['sass', 'browser-sync', 'js'], function () {
    watch('./assets/sass/**/*.scss', function() {
        gulp.start('sass');
    });
    watch('./assets/js/**/*', function() {
        gulp.start('js');
    });
    watch('./templates/**', function() {
        gulp.start('lara');
    });
});
