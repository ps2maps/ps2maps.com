// {{ $continent->name.' - '.date('Y-m-d H:i:s', $timestamp) }}

layers = {};
@foreach( $marker_types as $type )
<?php
	$params = array();
	if ( !is_null($type->icon_zoom_min) )
		array_push($params, 'iconZoomMin: '.$type->icon_zoom_min);

	if ( !is_null($type->icon_zoom_max) )
		array_push($params, 'iconZoomMax: '.$type->icon_zoom_max);

	if ( !is_null($type->text_zoom_min) )
		array_push($params, 'textZoomMax: '.$type->text_zoom_min);

	array_push($params, 'visible: false');
?>
layers.{{$type->icon}} = { <?php echo implode(', ', $params)?> };
@endforeach

var marker_data = {{ $marker_data }};
var territory_data = {{ $territory_data }};
var lattice_data = {{ $lattice_data }};
