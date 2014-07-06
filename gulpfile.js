var gulp = require('gulp');
var concat = require('gulp-concat');
// var sass = require('gulp-ruby-sass');
// var clean = require('gulp-clean');
// var jshint = require('gulp-jshint');
// var uglify = require('gulp-uglify');

var sources = {
	js : {
		map : [
			'public/js/map/init.js',
			'public/js/map/functions.js',
			'public/js/map/create-map.js',
			'public/js/map/create-regions.js',
			'public/js/map/create-markers.js',
			'public/js/map/log.js',
		],
		main : [
			'public/js/main/script.js',
			'public/js/main/cache.js'
		]
	}
};

// map.js build
gulp.task('map.js', function(){
	return gulp.src(sources.js.map)
		.pipe(concat('map.js'))
		.pipe(gulp.dest('./public/js'));
});

// script.js build
gulp.task('main.js', function() {
	return gulp.src(sources.js.main)
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./public/js'));
});

// Sass
// var sass_sources = ['./public/scss/*.scss'];
// gulp.task('sass', function() {
// 	return gulp.src('./public/scss/map.scss')
// 		.pipe(sass())
// 		.pipe(gulp.dest('./public/css'));
// });

// Watch
gulp.task('watch', function() {
	gulp.watch(sources.js.map, ['map.js']);
	gulp.watch(sources.js.main, ['main.js']);
});

gulp.task('default', []);
