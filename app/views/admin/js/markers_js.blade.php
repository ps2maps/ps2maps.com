territories = {};

layers = {};
layers.aircraftTerminal = { minZoom: 5, visible: false };
layers.ammoTower = { minZoom: 5, visible: false };
layers.ampStation = { minZoom: 1, maxZoom: 4, visible: false };
layers.bioLab = { minZoom: 1, maxZoom: 4, visible: false };
layers.capturePoint = { minZoom: 5, visible: false };
layers.equipmentTerminal = { minZoom: 5, visible: false };
layers.forwardSpawn = { minZoom: 5, visible: false };
layers.forwardSpawnLabeled = { minZoom: 4, maxZoom: 4, visible: false };
layers.galaxyTerminal = { minZoom: 5, visible: false };
layers.gateShieldGenerator = { minZoom: 5, visible: false };
layers.groundTransportTerminal = { minZoom: 5, visible: false };
layers.groundVehicleTerminal = { minZoom: 5, visible: false };
layers.horizontalShieldGenerator = { minZoom: 5, visible: false };
layers.landingPad = { minZoom: 5, visible: false };
layers.largeOutpost = { minZoom: 2, maxZoom: 4, visible: false };
layers.spawnControlUnitShieldGenerator = { minZoom: 5, visible: false };
layers.smallOutpost = { minZoom: 2, maxZoom: 4, visible: false };
layers.spawnControlUnit = { minZoom: 5, visible: false };
layers.spawnTube = { minZoom: 5, visible: false };
layers.techPlant = { minZoom: 1, maxZoom: 4, visible: false };
layers.verticalShieldGenerator = { minZoom: 5, visible: false };
layers.warpgateTerminal = { minZoom: 5, visible: false };
layers.warpgate = { minZoom: 0, maxZoom: 4, visible: false };

markers = [];
@foreach( $markers as $marker )
var marker = L.marker([{{$marker->lat}},{{$marker->lng}}], { icon: icons.neutral.{{$marker->marker_type->icon}}, clickable:true });
marker.id = {{$marker->id}};
marker.text = "{{ $marker->text }}";
marker.marker_type_id = {{ $marker->marker_type_id }};
@if ( !is_null($marker->territory_id))
	marker.territory_id = {{$marker->territory_id}};
@endif
@if ( !is_null($marker->text) )
	var options = { noHide: true };
	@if ( $marker->marker_type->icon == 'capturePoint' )
		options.className = "leaflet-label label-capture-point";
	@endif
	marker.bindLabel("{{$marker->text}}", options);
@endif
marker.addTo(map);
@if ( !is_null($marker->text) )
	marker.showLabel();
@endif
marker.on('click', function(e)
{
	marker = e.target;
	console.log( )
	markerClick();
	$('#marker-drag-toggle').trigger('click');
});
markers.push(marker);
@endforeach
