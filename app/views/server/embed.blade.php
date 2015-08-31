<!DOCTYPE html>
<html class='no-js'>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Embedded interactive live map of {{ $continent->name }} continent on the {{ $server['name'] }} server.</title>
	<meta name="description" content="@yield('meta_description', Config::get('ps2maps.meta_description'))">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
	<link rel="canonical" href="{{ Request::url() }}" />

	<link href='//fonts.googleapis.com/css?family=Roboto+Condensed' rel='stylesheet' type='text/css'>
	<link href="/css/embed.css" rel="stylesheet" type="text/css" charset="utf-8"/>
	<script src="/js/modernizr.custom.js"></script>
</head>
<body>

	<div id='svg-sprites'><?php require_once(public_path().'/img/sprites.svg'); ?></div>

	<script>
		var apis = {{ json_encode(Config::get('ps2maps.apis')) }};
		var apiVersion = "{{ Config::get('ps2maps.api_version') }}";
		var timeFormat = "{{ Config::get('ps2maps.time-formats.'.Session::get('time-format'), Config::get('ps2maps.time-formats.12')) }}";
		var server = {{ json_encode($server) }};
	</script>

	@include('factionColors')

	<div class='map'>
		<svg></svg>
		<h1>
			<a href="{{ Request::root().'/'.$server['slug'].'/'.$continent->slug }}">
				{{ $continent->name }} on {{ $server['name'] }}
			</a>
		</h1>
 		<h2>
 			<a href="http://ps2maps.com">
 				<svg viewBox="0 0 256 256" class="">
 					<use xlink:href="#ps2maps_logo"></use>
 				</svg>
 				<span>ps2maps.com</span>
 			</a>
 		</h2>
	</div>

	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="/js/jquery-2.1.0.min.js"><\/script>')</script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/snap.svg/0.3.0/snap.svg-min.js"></script>
	<script src="/js/plugins.js"></script>
	<script src="/js/main.js"></script>
	<script src="/js/{{ $continent->slug }}.js"></script>
	<script>
	var continent = {{ $continent->slug }};
	</script>
	<script src="/js/embed.js"></script>

	@include('analytics')

</body>
</html>
