@extends('templates/default')

<?php $bodyClass='continent-map' ?>

@section('title')
{{ $continent->name }} map on the {{ $server->name }} server for PlanetSide 2 Maps - ps2maps.com
@stop

@section('meta_description')
Live, interactive {{ $continent->name }} continent map on the {{ $server->name }} server for PlanetSide 2 Maps - ps2maps.com
@stop

@section('head')
	<link href="/css/leaflet.css" media="all" type="text/css" rel="stylesheet">
	<link href="/css/map.css" media="all" type="text/css" rel="stylesheet">
@append

@section('scripts')
	<script src="/js/leaflet/leaflet-src.js"></script>
	<script src="/js/{{ $continent->slug }}.js"></script>
	<script>
		var continent = {{ $continent->slug }};
		var tilesCdn = "{{ Config::get('ps2maps.tiles.cdn') }}";
		var timeFormat = "{{ Config::get('ps2maps.time-formats.'.Session::get('time-format'), Config::get('ps2maps.time-formats.12')) }}";
	</script>
	<script src="/js/map-plugins.js"></script>
	<script src="/js/continent.js"></script>

@append

@section('content')

	<div id='map'></div>

	@include('map/sidebar')

	@include('map/log')

	@include('userecho')

@stop
