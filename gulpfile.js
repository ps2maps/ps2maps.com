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
			'public/js/map/marker-defs.js',
			'public/js/map/create-markers.js',
			'public/js/map/create-lattice.js',
			'public/js/map/associations.js',
			'public/js/map/fetch-facility-control.js',
			'public/js/map/facility-control.js',
			'public/js/map/alerts.js',
			'public/js/map/log.js',
			'public/js/map/final.js'
		],
		main : [
			'public/js/main/main.js'
		],
		plugins: [
			'public/js/plugins/reconnecting-websocket.js',
			'public/js/plugins/leaflet.label-src.js',
			'public/js/plugins/leaflet.divlayer.js',
			'public/js/plugins/cache.js'
		]
	}
};

// map.js
gulp.task('map.js', function(){
	return gulp.src(sources.js.map)
		.pipe(concat('map.js'))
		.pipe(gulp.dest('./public/js'));
});

// script.js
gulp.task('main.js', function() {
	return gulp.src(sources.js.main)
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./public/js'));
});

// plugins.js
gulp.task('plugins.js', function() {
	return gulp.src(sources.js.plugins)
		.pipe(concat('plugins.js'))
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
	gulp.watch(sources.js.plugins, ['plugins.js']);
});

gulp.task('default', []);
