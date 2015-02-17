var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var bytediff = require('gulp-bytediff');
var sequence = require('run-sequence');
var fs = require('fs');
var del = require('del');
var print = require('gulp-print');
var ignore = require('gulp-ignore');

// Handle Errors
var errorFunction = function(error)
{
	gutil.beep();
	console.log(error);
}

var build = "build";

var src = {
	build: [
		// 'app/**/*',
		// 'bootstrap/**/*',
		'public/**/*',
		// 'vendor/**/*',
		'artisan',
	],
	buildIgnore: [
		'app/assets',
		'public/packages',
		'public/js/old',
	],
	images: 'public/img/*/**',
	coffee: {
		continent: [
			'app/assets/coffee/continent/map.coffee',
			'app/assets/coffee/continent/regions.coffee',
			'app/assets/coffee/continent/markers.coffee',
			'app/assets/coffee/continent/lattice.coffee',
			'app/assets/coffee/continent/associations.coffee',
			'app/assets/coffee/continent/grid.coffee',
			'app/assets/coffee/continent/log.coffee',
			'app/assets/coffee/continent/d3-charts.coffee',
			'app/assets/coffee/continent/event-handlers.coffee',
		],
		server: [
			'app/assets/coffee/server/icons.coffee',
			'app/assets/coffee/server/maps.coffee',
			'app/assets/coffee/server/d3.coffee',
			'app/assets/coffee/server/event-handlers.coffee',
		],
		embed: [
			'app/assets/coffee/embed/map.coffee',
			'app/assets/coffee/embed/event-handlers.coffee',
		],
		main: [
			'app/assets/coffee/main/ps2maps.coffee',
			'app/assets/coffee/main/census.coffee',
			'app/assets/coffee/main/search.coffee',
			'app/assets/coffee/main/event-handlers.coffee',
			'app/assets/coffee/main/init.coffee',
		]
	},
	js: {
		plugins: [
			'app/assets/js/plugins/jquery.selector-cache.js',
			'app/assets/js/plugins/json.js',
			'app/assets/js/plugins/jquery.svg.js',
			'app/assets/js/plugins/reconnecting-websocket.js',
			'app/assets/js/plugins/store2.js',
			'app/assets/js/plugins/store.cache.js',
			'app/assets/js/plugins/typeahead.jquery.js',
		],
		mapPlugins: [
			'app/assets/js/mapPlugins/*.js',
			]
	},
	sass: {
		all: [
		'app/assets/scss/**/*.scss',
		]
	}
};

// continent.js (CoffeeScript)
gulp.task('continent.js', function(){
	return gulp.src(src.coffee.continent)
	.pipe(plumber({
		errorHandler: errorFunction
	}))
	.pipe(coffee())
	.pipe(concat('continent.js'))
	.pipe(gulp.dest('./public/js'));
});

// server.js Coffeescript
gulp.task('server.js', function(){
	return gulp.src(src.coffee.server)
		.pipe(plumber({
		errorHandler: errorFunction
		}))
		.pipe(coffee())
		.pipe(concat('server.js'))
		.pipe(gulp.dest('./public/js'));
});

// embed.js Coffeescript
gulp.task('embed.js', function(){
	return gulp.src(src.coffee.embed)
		.pipe(plumber({
		errorHandler: errorFunction
		}))
		.pipe(coffee())
		.pipe(concat('embed.js'))
		.pipe(gulp.dest('./public/js'));
});

// main.js
gulp.task('main.js', function() {
	return gulp.src(src.coffee.main)
	.pipe(plumber({
		errorHandler: errorFunction
	}))
	.pipe(coffee())
	.pipe(concat('main.js'))
	.pipe(gulp.dest('./public/js'));
});

// plugins.js
gulp.task('plugins.js', function() {
	return gulp.src(src.js.plugins)
	.pipe(concat('plugins.js'))
	.pipe(gulp.dest('./public/js'));
});

// mapPlugins.js
gulp.task('mapPlugins.js', function() {
	return gulp.src(src.js.mapPlugins)
	.pipe(concat('map-plugins.js'))
	.pipe(gulp.dest('./public/js'));
});

// SCSS
gulp.task('sass', function() {
	return gulp.src(src.sass.all)
		.pipe(plumber({
			errorHandler: errorFunction
		}))
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('build:images:clean', function(){
	return del.sync([build + '/public/img']);
});

gulp.task('build:images', ['build:images:clean'], function(){
	return gulp.src(src.images)
		.pipe(imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true,
			verbose: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest(build + "/public/img"));
});

gulp.task('build:js:clean', function(){
	return del.sync([build + '/public/js']);
});

gulp.task('build:js:copy', function(){
	return gulp.src('public/js/**/*')
		.pipe(gulp.dest(build + '/public/js'));
});

gulp.task('build:js:minify', function(){
	return gulp.src(build + '/public/js/**/*.js')
		.pipe(ignore.exclude('*.min.js'))
		.pipe(bytediff.start())
		.pipe(uglify())
		.pipe(bytediff.stop())
		.pipe(gulp.dest(build + '/public/js'));
});

gulp.task('build:js', function(cb){
	return sequence('build:js:clean', 'build:js:copy', 'build:js:minify', cb);
});

gulp.task('build', function(){

	del.sync(build);

	return gulp.src(src.build)
		.pipe(ignore.exclude('public/favicon.ico'))
		.pipe(gulp.dest(build));

});

// Watch
gulp.task('watch', function() {
	gulp.watch(src.coffee.continent, ['continent.js']);
	gulp.watch(src.coffee.server, ['server.js']);
	gulp.watch(src.coffee.embed, ['embed.js']);
	gulp.watch(src.coffee.main, ['main.js']);
	gulp.watch(src.js.plugins, ['plugins.js']);
	gulp.watch(src.js.mapPlugins, ['mapPlugins.js']);
	gulp.watch(src.sass.all, ['sass']);
});

gulp.task('default', ['sass', 'continent.js', 'main.js', 'plugins.js', 'mapPlugins.js', 'server.js', 'embed.js', 'watch']);

