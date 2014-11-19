var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var debug = require('gulp-debug');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');

// Handle Errors
var errorFunction = function(error)
{
	gutil.beep();
	console.log(error);
}

var sources = {
	coffee: {
		map: [
			'app/assets/coffee/map/ps2maps.coffee',
			'app/assets/coffee/map/functions.coffee',
			'app/assets/coffee/map/map.coffee',
			'app/assets/coffee/map/regions.coffee',
			'app/assets/coffee/map/markers.coffee',
			'app/assets/coffee/map/lattice.coffee',
			'app/assets/coffee/map/associations.coffee',
			'app/assets/coffee/map/sidebar.coffee',
			'app/assets/coffee/map/alerts.coffee',
			'app/assets/coffee/map/log.coffee',
			'app/assets/coffee/map/grid.coffee'
		],
		census: [
			'app/assets/coffee/census/census.coffee'
		]
	},
	js: {
		main: [
			'public/js/main/main.js'
		],
		plugins: [
			'public/js/plugins/**/*.js',
		]
	},
	sass: {
		all: [
		'public/scss/**/*.scss'
		]
	}
};

// map.js (CoffeeScript)
gulp.task('map.js', function(){
	return gulp.src(sources.coffee.map)
	.pipe(plumber({
		errorHandler: errorFunction
	}))
	.pipe(concat('map.js'))
	.pipe(coffee())
	.pipe(gulp.dest('./public/js'));
});

// census.js (CoffeeScript)
gulp.task('census.js', function(){
	return gulp.src(sources.coffee.census)
	.pipe(plumber({
		errorHandler: errorFunction
	}))
	.pipe(concat('census.js'))
	.pipe(coffee())
	.pipe(gulp.dest('./public/js'));
});

// main.js
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

// map.css
gulp.task('sass', function() {
	gulp.src(sources.sass.all)
		.pipe(plumber({
			errorHandler: errorFunction
		}))
		.pipe(sass())
		.pipe(gulp.dest('./public/css'));
});

// Watch
gulp.task('watch', function() {
	gulp.watch(sources.coffee.map, ['map.js']);
	gulp.watch(sources.coffee.census, ['census.js']);
	gulp.watch(sources.js.main, ['main.js']);
	gulp.watch(sources.js.plugins, ['plugins.js']);
	gulp.watch(sources.sass.all, ['sass']);
});

gulp.task('default', ['sass', 'map.js', 'census.js', 'main.js', 'plugins.js', 'watch']);

