<?php

$title = isset($title) ? $title : "PlanetSide 2 Maps - ps2maps.com - Interactive maps for Amerish, Esamir and Indar";
$metaDescription = isset($metaDescription) ? $metaDescription : "PlanetSide 2 Maps is the definitive resource for interactive Auxaris continent maps - Amerish, Esamir and Indar";
$url = Request::url();

?><!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>{{ $title }}</title>
	<meta name="description" content="{{ $metaDescription }}">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	@include('opengraph')
	@include('twitter')

	<script type='text/javascript'>if (top !== self) top.location.href = self.location.href;</script>

	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
	<link rel="canonical" href="{{ $url }}" />
	<link href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet" media="screen"/>
	<link href="/css/main.css" rel="stylesheet" type="text/css" charset="utf-8"/>
	<link href='http://fonts.googleapis.com/css?family=Roboto+Condensed' rel='stylesheet' type='text/css'>

	@yield('styles')

	<script src='/js/modernizr.custom.js'></script>

	<script>
	var server, continent = null;
	</script>
	@yield('head')
</head>
<body>

	@include('menu.menu')

	@yield('content')

	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/jquery-2.1.0.min.js"><\/script>')</script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/js/bootstrap.min.js"></script>

	<script>
		@yield('javascript')

		$('document').ready(function()
		{
			@yield('jquery')
		});
	</script>

	@include('ga')

</body>
</html>
