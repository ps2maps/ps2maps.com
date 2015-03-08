@extends('templates/default')

@section('title')
{{ $server->name }} server maps of Amerish, Esamir, Hossin and Indar continents for PlanetSide 2 Maps - ps2maps.com
@stop

@section('meta_description')
Live, interactive continent maps for {{ $server->name }} server for PlanetSide 2 Maps - ps2maps.com
@stop

@section('content')

<div class='container-fluid'>
	<div class='continents' class='row'>

		<h1>{{ $server->name }} Server - Global Operations</h1>
		<h4 class='text-center'><a href="/embeddable?server={{ $server->slug }}">Embed these maps on your own website</a></h4>

		@foreach( $continents as $c )
		<div class='continent {{ $c->slug }} col-xs-12 col-sm-6 col-md-3 col-lg-3' data-id="{{ $c->id }}">
			<script src="/js/{{ $c->slug }}.js"></script>

			<div class='row'>

				<div class='col-xs-12 col-ms-6'>

					<a href='/{{ $server->slug }}/{{ $c->slug }}'>
						<div id='{{ $c->slug }}-map' class='map'></div>
						<h2>
								{{ $c->name }} <i class="fa fa-arrow-circle-right"></i>
						</h2>
					</a>

					<div class="last-activity clearfix">
						<span>Last Updated: </span><span class='timestamp-actual'></span>
						<div><small>(<span class='timestamp-duration' data-id="{{ $c->id }}">Just now</span>)</small></div>
					</div>

					<div id="{{ $c->slug }}-chart" class="chart">
					</div>

					<div class="facility-icons">
						<ul></ul>
					</div>

				</div>

			</div>
		</div>
		@endforeach

	</div>
</div>
@stop

@section('head')
	<link href="/css/server.css" media="all" type="text/css" rel="stylesheet">
@append

@section('scripts')

<script>
	var tilesCdn = "{{ Config::get('ps2maps.tiles.cdn') }}";
	var timeFormat = "{{ Config::get('ps2maps.time-formats.'.Session::get('time-format'), Config::get('ps2maps.time-formats.12')) }}";
</script>

<script src="/js/raphael-min.js"></script>
<script src="/js/server.js"></script>
@append

@section('javascript')

@append

@section('jquery')



@append
