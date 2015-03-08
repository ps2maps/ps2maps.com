<!DOCTYPE html>
<html class='no-js'>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>@yield('title', Config::get('ps2maps.title'))</title>
	<meta name="description" content="@yield('meta_description', Config::get('ps2maps.meta_description'))">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	@include('opengraph')
	@include('twitter')

	<script type='text/javascript'>if (top !== self) top.location.href = self.location.href;</script>

	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
	<link rel="canonical" href="{{ Request::url() }}" />

	<link href="/css/bootstrap.css" rel="stylesheet" media="screen"/>
	<link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css" media="all" type="text/css" rel="stylesheet">
	<link href="/css/main.css" rel="stylesheet" type="text/css" charset="utf-8"/>
	<link href='http://fonts.googleapis.com/css?family=Roboto+Condensed' rel='stylesheet' type='text/css'>

	@yield('styles')

	<script src='/js/modernizr.custom.js'></script>

	@yield('head')

</head>
<body class="@if(isset($bodyClass)){{$bodyClass}}@endif">

	<div id='svg-sprites'><?php require_once(public_path().'/img/sprites.svg'); ?></div>

	@include('factionColors')

	<div id="wrapper" class="">

		@include('nav/sidebar')

		<div id="page-content-wrapper">

			@include('nav/top')

			@yield('content')

		</div>

	</div>

	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/jquery-2.1.0.min.js"><\/script>')</script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/js/bootstrap.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.11/d3.min.js"></script>
	<script src="/js/plugins.js"></script>
	<script src="/js/main.js"></script>

	@yield('scripts')


	<script>
		@yield('javascript')

		$(function() {
			@yield('jquery')
		});
	</script>

	@include('analytics')

</body>
</html>
