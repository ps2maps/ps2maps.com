@extends('templates/default')

<?php
	// Title
	if ( isset($server) )
	{
		$title = "PlanetSide 2 Maps > " . $server->name ." server > " . $continent->name . ' continent';
		$metaDescription = "Interactive continent map of " . $continent->name . " on the " . $server->name . " server.";
	}

	$factionColorsNc = Session::get('faction-colors.nc', Config::get('ps2maps.faction-colors.nc'));
	$factionColorsTr = Session::get('faction-colors.tr', Config::get('ps2maps.faction-colors.tr'));
	$factionColorsVs = Session::get('faction-colors.vs', Config::get('ps2maps.faction-colors.vs'));

?>

@section('head')
	<link href="http://leaflet-cdn.s3.amazonaws.com/build/master/leaflet.css" media="all" type="text/css" rel="stylesheet">
	<link href="/css/map.css" media="all" type="text/css" rel="stylesheet">
	<style>
		svg.marker-icon.nc { fill: {{ $factionColorsNc }}; }
		svg.marker-icon.tr { fill: {{ $factionColorsTr }}; }
		svg.marker-icon.vs { fill: {{ $factionColorsVs }}; }
		.log-window .nc { color: {{ $factionColorsNc }};}
		.log-window .tr { color: {{ $factionColorsTr }};}
		.log-window .vs { color: {{ $factionColorsVs }};}
	</style>
@stop

@section('scripts')
	<script src="/js/main.js"></script>
	<script src="//augusta.gunsight/leaflet/dist/leaflet-src.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.11/d3.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min.js"></script>
	<script src="/js/plugins.js"></script>

	<script src="/js/{{ $continent->slug }}.js"></script>
	<script>
		var server = { id: {{$server->id}}, name: "{{$server->name}}", slug: "{{$server->slug}}" };
		var continent = {{ $continent->slug }};
			continent.id = {{$continent->id}};
			continent.name = "{{$continent->name}}";
			continent.slug = "{{$continent->slug}}";
		var tileVersion = "{{ $tileVersion }}";
		var tilesCdn = "{{ Config::get('ps2maps.tiles-cdn') }}";
		var factionColors = {
			nc: "{{ $factionColorsNc }}",
			tr: "{{ $factionColorsTr }}",
			vs: "{{ $factionColorsVs }}"
		};
		var timeFormat = "{{ Session::get('time-format', Config::get('ps2maps.time-format')) }}";
	</script>
	<script src="/js/map.js"></script>
@stop



@section('content')

	<div id='map'></div>

	@include('map/log')

	<div id='svg-sprites-container'></div>

	{{-- Sidebar--}}
	{{--@include('sidebar/sidebar')--}}

	{{-- Permalink Modal--}}
	{{--@include('modals/permalink')--}}

	{{-- Layers Modal--}}
	{{--@include('modals/icons')--}}

	{{-- UserEcho Feedback Widget--}}
	@include('userecho')

@stop
