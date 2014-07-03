var gulp = require('gulp');
var concat = require('gulp-concat');
// var clean = require('gulp-clean');
// var jshint = require('gulp-jshint');
// var uglify = require('gulp-uglify');

// map.js concatentation
var map_js_sources = [
	'./public/js/map/init.js',
	'./public/js/map/create-map.js',
	'./public/js/map/log.js',
	'./public/js/map/markers.js',
	'./public/js/map/functions.js',
	'./public/js/map/create-regions.js',
	'./public/js/map/create-markers.js',
];
gulp.task('map.js', function(){
	return gulp.src(map_js_sources)
		.pipe(concat('map.js'))
		.pipe(gulp.dest('./public/js'));
});

// script.js concatentation
var main_js_sources = [
	'./public/js/main/script.js',
	'./public/js/main/cache.js',
];
gulp.task('main.js', function(){
	return gulp.src(main_js_sources)
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./public/js'));
});

// Watch
gulp.task('watch', function() {
	gulp.watch(map_js_sources, ['map.js']);
	gulp.watch(main_js_sources, ['main.js']);
});

gulp.task('default', ['map.js']);
