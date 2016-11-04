var gulp = require('gulp');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var notify = require('gulp-notify');
var wiredep = require('gulp-wiredep');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify')
var browserSync = require('browser-sync').create();

gulp.task('default', ['build', 'watch', 'browser-sync']);

gulp.task('clean', function(){
	return gulp.src('build/')
			   .pipe(clean());
});
gulp.task('build', ['html', 'styles', 'js', 'assets']);

gulp.task('watch', function(){	
	gulp.watch('./src/styles/**/*.scss', ['styles']);
	gulp.watch('./src/js/**/*.js', ['js']);
	gulp.watch(['./bower.json', './src/index.html'], ['html']);
	gulp.watch('./src/assets/**/*.*', ['assets'])
	gulp.watch('./src/**/*.{js,css,html}').on('change', browserSync.reload);
});

gulp.task('browser-sync', function() {
    return browserSync.init({
        server: {
            baseDir: './build/'
        }
    });
});

gulp.task('wiredep', function(){
	return gulp.src('./src/index.html')
		.pipe(wiredep({
			derictory: 'bower_components/'
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('html', ['wiredep'], function() {
		gulp.src('build/index.html')
			.pipe(useref())
			.pipe(gulp.dest('build/'));
});

gulp.task('styles', function(){
	return gulp.src('src/styles/**/{main, common}.scss')
	.pipe(plumber({ // plumber - плагин для отловли ошибок.
            errorHandler: notify.onError(function(err) { // nofity - представление ошибок в удобном для вас виде.
            	return {
            		title: 'Styles',
            		message: err.message
            	}
            })
        }))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(autoprefixer({ //Добавление autoprefixer.
        browsers: ['last 2 versions']
    }))
	.pipe(concat('style.css'))	
	.pipe(cssnano())
	.pipe(sourcemaps.write())
	.pipe(rename('build.css'))
	.pipe(gulp.dest('build/styles'));
});

 gulp.task('js', function(){
 	return gulp.src('src/js/**/*.js')
 			.pipe(uglify())
 			.pipe(gulp.dest('./build/js'))
 });

gulp.task('assets', function(){
	gulp.src('./src/assets/**/*.*')
		.pipe(gulp.dest('./build/assets'));
})
