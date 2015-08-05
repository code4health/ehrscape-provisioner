var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var copy = require('gulp-copy');
var karma = require('gulp-karma');

var testFiles = [
  './app/bower_components/angular/angular.js',
  './app/bower_components/angular-route/angular-route.js',
  './app/bower_components/angular-mocks/angular-mocks.js',
  './app/bower_components/ngQueue/ngQueue.js',
  './app/bower_components/sweetalert/dist/sweetalert.min.js',
  './app/app.js',
  './app/controllers/*.js',
  './app/directives/*.js',
  './app/data/*.js',
  './app/models/*.js',
  './test/controllers/*.js',
  './test/models/*.js',
];

gulp.task('test', function() {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});

gulp.task('default', function() {
  gulp.start('combine-angular', 'sass');
});

gulp.task('combine-angular', function() {
  return gulp.src([
      './app/bower_components/jquery/dist/jquery.min.js',
      './app/bower_components/foundation/js/vendor/modernizr.js',
      './app/bower_components/foundation/js/foundation.min.js',
      './app/bower_components/sweetalert/dist/sweetalert.min.js',
      './app/bower_components/angular/angular.min.js',
      './app/bower_components/angular-route/angular-route.min.js',
      './app/bower_components/ngQueue/ngQueue.min.js',
      './app/app.js',
      './app/data/*.js',
      './app/models/*.js',
      './app/controllers/*.js',
      './app/directives/*.js',
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('sass', function () {
  gulp.src([
      './app/bower_components/foundation/scss/normalize.scss',
      './app/bower_components/foundation/scss/foundation.scss',
      './app/bower_components/sweetalert/dist/sweetalert.css',
      './assets/stylesheets/style.scss'
    ])
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch-test', function() {
  gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('watch', function() {
  gulp.watch('./assets/stylesheets/*.scss', ['sass']);
  gulp.watch(['./app/*.js', './app/*/*.js'], ['combine-angular']);
  gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});
