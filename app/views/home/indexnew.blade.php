@extends('templates/default')

@section('content')

<div class='container'>
	<div class='row'>
		<div class='col-xs-12'>
			<select>
				@foreach( $servers as $server )
				<option value='{{ $server->slug }}'>{{ $server->name }}</option>
				@endforeach
			</select>
		</div>
	</div>

	<div id='continents'>

		@foreach( $continents as $continent )
		<hr>
		<div class='continent'>
			<div class='row {{ $continent->slug }}'>
				<div class='col-sm-12'>
					<h2>{{ $continent->name }}</h2>
					<div class='territory'>
						<div class='nc faction'></div>
						<div class='tr faction'></div>
						<div class='vs faction'></div>
					</div>
				</div>
			</div>
			<div class='row'>
				<div class='col-sm-6'>

				</div>
				<div class='col-sm-6'>
					<div id='{{ $continent->slug }}-map' class='map'></div>
				</div>
			</div>
		</div>
		@endforeach
		</div>

</div>
@stop

@section('scripts')
	<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.8/d3.min.js"></script>
	@foreach( $continents as $continent )
		<script src="/js/{{ $continent->slug }}.js"></script>
	@endforeach
@append

@section('javascript')

(function() {
var w = 768, h = 768;
@foreach( $continents as $continent )
	var continent = '{{ $continent->slug }}';
	var paper = Raphael(continent+'-map',w,h);
	paper.setViewBox(0,0,w,h,true);
	paper.setSize('100%', '100%');
	paper.image('/img/' + continent + '.jpg',0,0,w,h);
	paper.setStart();
	for( i in territory_data ) {
		var data = territory_data[i];
		var string = "M" + data.points[0][0] + "," + data.points[0][1];
		for( var c=1; c < data.points.length; c++ ) {
			string += "L" + data.points[c][0] + "," + data.points[c][1];
		}
		string += "z";

		var path = paper.path(string);
		path.attr('fill','red');
		path.attr('fill-opacity', '0.5');
		path.attr('stroke', '#FFF');
	}
	var set = paper.setFinish();
	var offset = {
		'tx': 8,
		'ty': 8,
		'r': 0,
		'sx': 2.88,
		'sy': 2.88
	}
	set.transform("T" + offset.tx + "," + offset.ty + "R" + offset.r + "S" + offset.sx + "," + offset.sy + ",0,0");
@endforeach
})()

@append

@section('jquery')

var maps = $('#continents .map');
$(window).on('resize', function(){
	maps.height( maps.width() );
}).trigger('resize');

@append
