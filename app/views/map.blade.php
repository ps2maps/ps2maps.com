@extends('templates/default')

<?php
	// Title
	if ( isset($server) )
	{
		$title = "PlanetSide 2 Maps > " . $server->name ." server > " . $continent->name . ' continent';
		$metaDescription = "Interactive continent map of " . $continent->name . " on the " . $server->name . " server.";
	}

?>

@section('scripts')
	<script src="/js/main.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js"></script>
	<script src="/js/leaflet.label.js"></script>
	<script src="/js/leaflet.divlayer.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.0.8/d3.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.0.0/moment.min.js"></script>

	<script src="/js/{{ $continent->slug }}.js"></script>
	<script>
		var server = { id: {{$server->id}}, name: "{{$server->name}}", slug: "{{$server->slug}}" };
		var continent = {{ $continent->slug }};
			continent.id = {{$continent->id}};
			continent.name = "{{$continent->name}}";
			continent.slug = "{{$continent->slug}}";
		var tileVersion = "{{ $tileVersion }}";
		var tilesCdn = "{{ Config::get('ps2maps.tiles-cdn') }}";
	</script>
	<script src="/js/map.js"></script>
@stop

@section('head')
	<link href="//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css" media="all" type="text/css" rel="stylesheet">
	<link href="/css/map.css" media="all" type="text/css" rel="stylesheet">
@stop

@section('content')

	<div id='map'></div>

	@include('map/log')

	{{-- Sidebar--}}
	{{--@include('sidebar/sidebar')--}}

	{{-- Permalink Modal--}}
	{{--@include('modals/permalink')--}}

	{{-- Layers Modal--}}
	{{--@include('modals/icons')--}}

	{{-- UserEcho Feedback Widget--}}
	@include('userecho')

@stop
