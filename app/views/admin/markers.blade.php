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

	@include('admin/sidebar/sidebar')

@endsection

@section('admin-scripts')
	@include('admin/js/map_js')
	@include('admin/js/markers_js')
@endsection

@section('jquery')
$('#marker-drag-toggle').on('click', function(){

	if ( !$(this).hasClass('active') )
	{
		marker.dragging.enable();
		marker.on('dragend', function(e){ e.target.fire('click'); $('#marker-save').trigger('click'); });
		$(this).text("Draggable: On");
	}
	else
	{
		marker.dragging.disable();
		marker.off('dragend');
		$(this).text("Draggable: Off");
	}
});

$('#marker_type_id').on('change', function(){

	var value = parseInt($(this).val());
	marker.marker_type_id = value;

	switch(value)
	{
		case 13:
			marker.setIcon(icons.neutral.aircraftTerminal);
			break;

		case 18:
			marker.setIcon(icons.neutral.ammoTower);
			break;

		case 6:
			marker.setIcon(icons.neutral.ampStation);
			break;

		case 4:
			marker.setIcon(icons.neutral.bioLab);
			break;

		case 12:
			marker.setIcon(icons.neutral.capturePoint);
			break;

		case 17:
			marker.setIcon(icons.neutral.equipmentTerminal);
			break;

		case 28:
			marker.setIcon(icons.neutral.forwardSpawn);
			break;

		case 11:
			marker.setIcon(icons.neutral.forwardSpawnLabeled);
			break;

		case 15:
			marker.setIcon(icons.neutral.galaxyTerminal);
			break;

		case 25:
			marker.setIcon(icons.neutral.gateShieldGenerator);
			break;

		case 16:
			marker.setIcon(icons.neutral.groundTransportTerminal);
			break;

		case 14:
			marker.setIcon(icons.neutral.groundVehicleTerminal);
			break;

		case 23:
			markersetIon(icons.neutral.horizontalShieldGenerator);
			break;

		case 19:
			marker.setIcon(icons.neutral.landingPad);
			break;

		case 2:
			marker.setIcon(icons.neutral.largeOutpost);
			break;

		case 20:
			marker.setIcon(icons.neutral.spawnControlUnitShieldGenerator);
			break;

		case 3:
			marker.setIcon(icons.neutral.smallOutpost);
			break;

		case 21:
			marker.setIcon(icons.neutral.spawnControlUnit);
			break;

		case 22:
			marker.setIcon(icons.neutral.spawnTube);
			break;

		case 5:
			marker.setIcon(icons.neutral.techPlant);
			break;

		case 26:
			marker.setIcon(icons.neutral.teleporter);
			break;

		case 24:
			marker.setIcon(icons.neutral.verticalShieldGenerator);
			break;

		case 27:
			marker.setIcon(icons.neutral.warpgateTerminal);
			break;

		case 1:
			marker.setIcon(icons.neutral.warpgate);
			break;
	}
});

$('#marker-text').on('change', function(){

	marker.unbindLabel();

	if ( $(this).val() == "" )
	{
		marker.text = "";
		return false;
	}

	marker.text = $(this).val();

	var options = { noHide: true };

	if ( marker.marker_type_id == 12 )
		options.className = "leaflet-label label-capture-point";
	marker.bindLabel($(this).val(), options).showLabel();

});

// Save Marker
$('#marker-save').on('click', function(){

	var data = {
		id: marker.id,
		text: $('#marker-text').val(),
		marker_type_id: $('#marker_type_id').val(),
		lat: $('#marker-lat').val(),
		lng: $('#marker-lng').val()
	}

	$.post('/admin/ajax/updateMarker', data, function(result){
		if ( result == true )
		{
			console.log("Marker Updated: " + data.text + " ( " + data.id + " )");
		}
		else
			console.log(result);
	});
});

// Delete Marker
$('#marker-delete').on('click', function(){
	if ( confirm("Permanently Delete Marker????") == false )
		return false;

	console.log('Deleting Marker ID: ' + marker.id);

	var data = {
		id: marker.id
	};

	$.post('/admin/ajax/deleteMarker', data, function(result){
		if ( result == true )
		{
			console.log('Deleted. Removing marker and label from DOM.');
			marker.unbindLabel();
			map.removeLayer(marker);
			marker = null;
		}
		else
			console.log(result);
	});

});

// Create Marker
$('#marker-create').on('click', function(){
	var center = map.getCenter();
	var lat = center.lat;
	var lng = center.lng;

	marker = L.marker([lat,lng], { clickable:true, draggable: true });
	marker.on('click', function(e)
	{
		marker = e.target;
		markerClick();
	});
	marker.on('dragend', function(e){ e.target.fire('click'); $('#marker-save').trigger('click'); });

	var marker_type_id = parseInt($('#marker_create_type_id').val());
	marker.marker_type_id = marker_type_id;
	switch(marker_type_id)
	{
		case 13:
			marker.setIcon(icons.neutral.aircraftTerminal);
			break;

		case 18:
			marker.setIcon(icons.neutral.ammoTower);
			break;

		case 6:
			marker.setIcon(icons.neutral.ampStation);
			break;

		case 4:
			marker.setIcon(icons.neutral.bioLab);
			break;

		case 12:
			marker.setIcon(icons.neutral.capturePoint);
			break;

		case 17:
			marker.setIcon(icons.neutral.equipmentTerminal);
			break;

		case 28:
			marker.setIcon(icons.neutral.forwardSpawn);
			break;

		case 11:
			marker.setIcon(icons.neutral.forwardSpawnLabeled);
			break;

		case 15:
			marker.setIcon(icons.neutral.galaxyTerminal);
			break;

		case 25:
			marker.setIcon(icons.neutral.gateShieldGenerator);
			break;

		case 16:
			marker.setIcon(icons.neutral.groundTransportTerminal);
			break;

		case 14:
			marker.setIcon(icons.neutral.groundVehicleTerminal);
			break;

		case 23:
			markersetIon(icons.neutral.horizontalShieldGenerator);
			break;

		case 19:
			marker.setIcon(icons.neutral.landingPad);
			break;

		case 2:
			marker.setIcon(icons.neutral.largeOutpost);
			break;

		case 20:
			marker.setIcon(icons.neutral.spawnControlUnitShieldGenerator);
			break;

		case 3:
			marker.setIcon(icons.neutral.smallOutpost);
			break;

		case 21:
			marker.setIcon(icons.neutral.spawnControlUnit);
			break;

		case 22:
			marker.setIcon(icons.neutral.spawnTube);
			break;

		case 5:
			marker.setIcon(icons.neutral.techPlant);
			break;

		case 26:
			marker.setIcon(icons.neutral.teleporter);
			break;

		case 24:
			marker.setIcon(icons.neutral.verticalShieldGenerator);
			break;

		case 27:
			marker.setIcon(icons.neutral.warpgateTerminal);
			break;

		case 1:
			marker.setIcon(icons.neutral.warpgate);
			break;
	}


	var data = {
		marker_type_id: $('#marker_type_id').val(),
		lat: lat,
		lng: lng,
		continent_id: continent.id
	}

	$.post('/admin/ajax/saveMarker', data, function(result){
		marker.id = parseInt(result);
		marker.addTo(map);
		markerClick();
	});


});


@endsection




@section('javascript')

function markerClick()
{
	if ( marker == null )
	{
		$('#marker_id').val("");
		$('#marker-text').val("");
		$('#marker-lat').val("");
		$('#marker-lng').val("");
		return false;
	}

	if ( marker.dragging._enabled && marker.dragging._enabled == true )
	{
		$('#marker-drag-toggle').addClass('active').text("Draggable: On");
	}
	else
	{
		$('#marker-drag-toggle').removeClass('active').text("Draggable: Off");
	}

	$('#marker_id').val( marker.id );
	$('#marker-lat').val( marker._latlng.lat );
	$('#marker-lng').val( marker._latlng.lng );

	if ( marker._label )
	{
		$('#marker-text').val( marker._label._content );
	}
	else
	{
		$('#marker-text').val('');
	}


	$('#marker_type_id').val( marker.marker_type_id );
}

@endsection
