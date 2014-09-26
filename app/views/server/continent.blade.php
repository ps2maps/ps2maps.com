@extends('templates/default')

@section('title')
PlanetSide 2 Maps - {{ $continent->name }} map on the {{ $server->name }} server
@stop

@section('meta_description')
Interactive continent map of {{ $continent->name }} on the {{ $server->name }} server
@stop

@section('head')
	<link href="//leaflet-cdn.s3.amazonaws.com/build/master/leaflet.css" media="all" type="text/css" rel="stylesheet">
	<link href="/css/map.css" media="all" type="text/css" rel="stylesheet">
@append

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
		var tileVersion = "{{ $tileVersion }}";
		var tilesCdn = "{{ Config::get('ps2maps.tiles-cdn') }}";
		var timeFormat = "{{ Config::get('ps2maps.time-formats.'.Session::get('time-format'), 'ps2maps.time-formats.12') }}";
	</script>
	<script src="/js/map.js"></script>
@stop

@section('content')

	<div id='svg-sprites-container'><?php require_once(public_path().'/img/icons/sprites.svg'); ?></div>

	@include('map/alert-dialogs')

	<div id='map'></div>

	@include('map/sidebar')

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
