@layout('admin.template')

<?php
	// GET variables (x,y,z coordinates)
	$x = Input::get('x');
	if ( !is_numeric($x) )
		$x = $continent->center_lat;

	$y = Input::get('y');
	if ( !is_numeric($y) )
		$y = $continent->center_lng;

	$z = Input::get('z');
	if ( !is_numeric($z) )
		$z = $continent->zoom_default;
?>

@section('javascript-head')

@if ( isset($server) )
var server = { id: {{$server->id}}, name: "{{$server->name}}", slug: "{{$server->slug}}" };
@else
var server = null;
@endif

var continent = { id: {{$continent->id}}, name: "{{$continent->name}}", slug: "{{$continent->slug}}", minZoom: "{{ $continent->zoom_min }}", maxZoom: "{{ $continent->zoom_max }}" };
var defaultView = {lat:{{$x}},lng:{{$y}},zoom:{{$z}}};
@endsection

@section('content')

	<div id='map'></div>

	@include('admin/sidebar/lattice')

@endsection

@section('admin-scripts')
	@include('admin/js/map_js')
@endsection

@section('javascript')

	markers = [];
	@foreach( $markers as $marker )
	var marker = L.marker([{{$marker->lat}},{{$marker->lng}}], { icon: icons.neutral.{{$marker->icon}}, clickable:true });
	marker.id = {{$marker->id}};
	marker.text = "{{ $marker->text }}";
	marker.marker_type_id = {{ $marker->marker_type_id }};
	@if ( !is_null($marker->territory_id))
		marker.territory_id = {{$marker->territory_id}};
	@endif
	@if ( !is_null($marker->text) )
		var options = { noHide: true };
		marker.bindLabel("{{$marker->text}}", options);
	@endif
	marker.addTo(map);
	@if ( !is_null($marker->text) )
		marker.showLabel();
	@endif
	marker.on('click', function(e)
	{
		markerClick(e.target);
	});
	markers.push(marker);
	@endforeach

	var next_marker_input = 'a';
	var marker_a = null;
	var marker_b = null;
	function markerClick(marker)
	{
		console.log(marker);

		if ( next_marker_input == 'a' )
		{
			$('#marker_a').val(marker.id);
			marker_a = marker;
			next_marker_input = 'b';
		}
		else
		{
			$('#marker_b').val(marker.id);
			marker_b = marker;
			next_marker_input = 'a';
		}
	}

	var latticeStyle = {
		color: '#5fc8c1',
		opacity: 1,
		weight: 5
	}

	var latticeLinks = [];
	@foreach( $latticeLinks as $link )
		latticeLinks.push( L.polyline( [[{{$link->lat_a}},{{$link->lon_a}}],[{{$link->lat_b}},{{$link->lon_b}}]], latticeStyle).addTo(map));
	@endforeach

@endsection

@section('jquery')

	$('#lattice-save').on('click', function()
	{
		var data = {
			'marker_a_id': $('#marker_a').val(),
			'marker_b_id': $('#marker_b').val()
		};

		$.post('/admin/ajax/saveLattice', data, function(response){
			if ( response == true )
			{
				console.log("Lattice Link successfully created between: " + data.marker_a_id + " & " + data.marker_b_id);
				L.polyline( [ marker_a._latlng, marker_b._latlng], latticeStyle).addTo(map);
			}
			else
				console.log(response);
		});


	});

	$('#lattice-clear').on('click', function()
	{
		$('#marker_a').val('');
		$('#marker_b').val('');
		next_marker_input = 'a';
	});

@endsection
