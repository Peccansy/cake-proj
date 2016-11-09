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
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('default', ['dev']);

gulp.task('dev', ['build', 'watch', 'browser-sync']);

gulp.task('clean', function(){
	return gulp.src('build/')
			   .pipe(clean());
});

gulp.task('build', ['html', 'styles', 'js', 'assets']);

gulp.task('watch', ['html'], function(){	
	gulp.watch('./src/styles/**/*.scss', ['styles']);
	gulp.watch('./src/js/**/*.js', ['js']);
	gulp.watch(['./src/index.html', 'bower.json'], ['html']);
	gulp.watch('./src/assets/**/*.*', ['assets']);
	gulp.watch('./src/**/*.{js,scss,css,html}').on('change', browserSync.reload);
});

gulp.task('browser-sync', function() {
    return browserSync.init({
        server: {
            baseDir: './build/'
        }
    });
});


gulp.task('bower', function() {
	return gulp.src('./src/index.html')
	.pipe(wiredep({
		derictory: 'bower_components/'
	}))	
	.pipe(gulp.dest('./src'));
});

gulp.task('html', ['bower', 'useref']);
	

gulp.task('useref', ['bower'], function(){
	return gulp.src('./src/index.html')
		.pipe(useref())
		.pipe(gulp.dest('./build'));
})
// gulp.task('wiredep', function(){
// 	gulp.src('./src/index.html')
// 		.pipe(wiredep({
// 			derictory: 'bower_components/'
// 		}))
// 		.pipe(gulp.dest('./src/'));
// });

gulp.task('styles', function(){
	return gulp.src('./src/styles/**/*.scss')
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
	.pipe(gulp.dest('./build/styles'));
});

 gulp.task('js', function(){
 	return gulp.src('src/js/**/*.js')
 			.pipe(uglify())
 			.pipe(gulp.dest('./build/js'))
 });

gulp.task('assets',['optimizeimg'], function(){
	gulp.src('./src/assets/**/*.*')
		.pipe(gulp.dest('./build/assets'));
});

gulp.task('optimizeimg', function(){
	return gulp.src('./src/assets/img/**/*.{jpg,png}')
		.pipe(imagemin())
		.pipe(gulp.dest(function(file){

    		return file.base;

		}));
});
