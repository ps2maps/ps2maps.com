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

	@include('admin/sidebar/territories')

@endsection


@section('admin-scripts')

	@include('admin/js/map_js')
	@include('admin/js/hexgrid_js')

@endsection





@section('jquery')

$('#highlight').on('click', function(){

	var data = { id: $('#territory_id').val() };
	$.post('/admin/ajax/getTerritoryHexes', data, function(result){

		console.log(result);

		resetGrid();

		for( x in result )
		{
			for( y in result[x] )
			{
				grid.hexes[x][y].select();
			}
		}

		console.log('Hexes loaded for: ' + $('#territory_id option:selected').text() + " ( " + $('#territory_id').val() + " )");

	});
});

$('#save').on('click', function(){
	var data = {
		id: $('#territory_id').val(),
		coordinates: []
	};

	for( x in grid.hexes )
	{
		for( y in grid.hexes[x] )
		{
			if ( grid.hexes[x][y].selected == true )
				data.coordinates.push({x:x, y:y});
		}
	}

	$.post('/admin/ajax/saveTerritoryHexes', data, function(result){
		if ( result == true )
		{
			console.log('Hexes saved for: '+ $('#territory_id option:selected').text() + " ( " + $('#territory_id').val() + " )");

			var color = '#'+Math.floor(Math.random()*16777215).toString(16);
			for( x in grid.hexes )
			{
				for( y in grid.hexes[x] )
				{
					if ( grid.hexes[x][y].selected == true )
					{
						grid.hexes[x][y].color(color);
						grid.hexes[x][y].selected = false;
					}
				}
			}
			resetGrid();

		}
		else
			console.log(result);
	});

});

$('#create').on('click', function(){
	if ( $('#new_territory_name').val() == '' || $('#new_territory_id').val() == '' )
		return false;

	var id = $('#new_territory_id').val();
	var name = $('#new_territory_name').val();

	var data = { name: name, id: id, continent_id: continent.id };
	$.post('/admin/ajax/createNewTerritory', data, function(result){
		if ( result == true )
		{
			console.log('New Territory Created: ' + name );
			$('#territory_id').append("<option value='" + id + "'>" + name + " - (" + id + ")</option>").val(id);
			$('#new_territory_name, #new_territory_id').val('');
		}
		else
			console.log(result);
	});
});

@foreach( $territories as $territory )
	var color = "{{ sprintf('#%x%x%x', rand(0,255), rand(0,255), rand(0,255)); }}";
	@foreach( $territory->coordinates as $coordinate )
		grid.hexes[{{$coordinate->x}}][{{$coordinate->y}}].color(color);
	@endforeach
@endforeach

@endsection




@section('javascript')

function resetGrid()
{
	for( x in grid.hexes )
	{
		for( y in grid.hexes[x] )
		{
			grid.hexes[x][y].deselect();
		}
	}
}

@endsection
