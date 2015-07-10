var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*', '*']
});

// Handle Errors
var errorFunction = function(error)
{
	// $.gutil.beep();
	console.log(error);
}

var build = "./build";
var debug = false

var src = {
	build: [
		'./artisan',
		'./app/**/*',
		'./bootstrap/**/*',
		'./public/**/*',
		// './vendor/**/*',
		'!./app/{assets,assets/**}',
		'!./app/storage/cache/**',
		'!./app/storage/{debugbar,debugbar/**}',
		'!./app/storage/logs/**',
		'!./app/storage/sessions/**',
		'!./app/storage/views/**',
		'!./public/js/{old,old/**}',
		'!./public/{packages,packages/**}',
	],
	buildImages: [
		'./build/public/img/**/*.jpg',
		'./build/public/img/**/*.jpeg',
		'./build/public/img/**/*.png',
		'./build/public/img/**/*.gif',
	],
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
		continentDebug: 'app/assets/coffee/continent/debug.coffee',
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
			'app/assets/js/plugins/svg4everybody.js',
			'app/assets/js/plugins/jquery.svg.js',
			'app/assets/js/plugins/svg-sprite-polyfill.js',
			'app/assets/js/plugins/json.js',
			'app/assets/js/plugins/reconnecting-websocket.js',
			'app/assets/js/plugins/store2.js',
			'app/assets/js/plugins/store.cache.js',
			'app/assets/js/plugins/typeahead.jquery.js'
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
	var source = src.coffee.continent;
	if (debug == true) {
		source.push(src.coffee.continentDebug);
	}
	return gulp.src(source)
	.pipe($.plumber({
		errorHandler: errorFunction
	}))
	.pipe($.coffee())
	.pipe($.concat('continent.js'))
	.pipe(gulp.dest('./public/js'));
});

// server.js Coffeescript
gulp.task('server.js', function(){
	return gulp.src(src.coffee.server)
		.pipe($.plumber({
			errorHandler: errorFunction
		}))
		.pipe($.coffee())
		.pipe($.concat('server.js'))
		.pipe(gulp.dest('./public/js'));
});

// embed.js Coffeescript
gulp.task('embed.js', function(){
	return gulp.src(src.coffee.embed)
		.pipe($.plumber({
			errorHandler: errorFunction
		}))
		.pipe($.coffee())
		.pipe($.concat('embed.js'))
		.pipe(gulp.dest('./public/js'));
});

// main.js
gulp.task('main.js', function() {
	return gulp.src(src.coffee.main)
	.pipe($.plumber({
		errorHandler: errorFunction
	}))
	.pipe($.coffee())
	.pipe($.concat('main.js'))
	.pipe(gulp.dest('./public/js'));
});

// plugins.js
gulp.task('plugins.js', function() {
	return gulp.src(src.js.plugins)
	.pipe($.concat('plugins.js'))
	.pipe(gulp.dest('./public/js'));
});

// mapPlugins.js
gulp.task('mapPlugins.js', function() {
	return gulp.src(src.js.mapPlugins)
	.pipe($.concat('map-plugins.js'))
	.pipe(gulp.dest('./public/js'));
});

// SCSS
gulp.task('sass', function() {
	return gulp.src(src.sass.all)
		.pipe($.sass({
			sourceComments: true
		}))
		.pipe($.autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./public/css'));
});

// SVG Sprites
gulp.task('svg', function(){
	return gulp.src('svgs/**/*.svg')
		.pipe($.svgstore())
		.pipe($.svgmin({
			plugins: [{
				cleanupIDs: false
			}]
		}))
		.pipe($.rename('sprites.svg'))
		.pipe(gulp.dest('public/img'));
});

// Build Images
// Optimize and compress images
gulp.task('build:images', function(){
	return gulp.src([build + '/public/img/**/*.jpg', build + '/public/img/**/*.png'])
		.pipe($.imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true,
			verbose: true,
			use: [$.imageminPngquant()]
		}))
		.pipe(gulp.dest(build + "/public/img"));
});

// Build JavaScript
gulp.task('build:js', function(){
	return gulp.src(build + '/public/js/**/*.js')
		.pipe($.ignore.exclude('*.min.js'))
		.pipe($.bytediff.start())
		.pipe($.uglify())
		.pipe($.bytediff.stop())
		.pipe(gulp.dest(build + '/public/js'));
});

// Clean (delete) the build directory
gulp.task('build:clean', function(){
	return $.del.sync(build);
});

// Copy Build files to build directory
gulp.task('build:copy', function(){

	return gulp.src(src.build, {base:'.'})
		.pipe(gulp.dest(build));
});

gulp.task('build:zip', function(){
	return gulp.src(build + '/**')
		.pipe($.zip('build.zip'))
		.pipe(gulp.dest('.'));
});

// Master build task
gulp.task('build', function(cb){

	return $.runSequence('build:clean', 'build:copy', 'build:js', 'build:images', 'build:zip', cb);

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
	gulp.watch('svgs/**/*.svg', ['svg']);
});

gulp.task('default', ['sass', 'continent.js', 'main.js', 'plugins.js', 'mapPlugins.js', 'server.js', 'embed.js', 'svg', 'watch']);

