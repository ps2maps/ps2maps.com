// Map Zoomend Event
// map.on('zoomend', function(e)
// {
// 	if ( typeof layers != 'undefined' )
// 		checkLayers();
// });

// Check Layer Visibility
function checkLayer(layer)
{
	if ( !layers[layer] )
		return false;

	var zoom = map.getZoom();
	if (
		( layers[layer].iconZoomMin <= zoom || !layers[layer].iconZoomMin ) &&
		( zoom <= layers[layer].iconZoomMax || !layers[layer].iconZoomMax ) &&
		$('input#checkbox-' + layer).is(':checked')
	)
	{
		showLayer(layer);
	}
	else
	{
		hideLayer(layer);
	}
}

// Check All Layers Visibility
function checkLayers()
{
	var zoom = map.getZoom();

	for( layer in layers )
	{
		var checkbox = $('input#checkbox-' + layer);
		if (
			( $(checkbox).is(':checked') || $(checkbox).length == 0 ) &&
			( layers[layer].iconZoomMin <= zoom || !layers[layer].iconZoomMin ) &&
			( zoom <= layers[layer].iconZoomMax || !layers[layer].iconZoomMax )
		)
		{
			showLayer(layer);
		}
		else
		{
			hideLayer(layer);
		}
	}
}

// Show Layer
function showLayer(layer)
{
	// Layer already visible
	if ( layers[layer].visible == true )
		return false;

	// Showing Layer
	layers[layer].visible = true;

	// Show layer
	layers[layer].layerGroup.addTo(map);

	// Show label (if applicable)
	if ( layers[layer].has_label == true )
		layers[layer].layerGroup.eachLayer(function(layer){ layer.showLabel() });
}

// Hide Layer
function hideLayer(layer)
{
	// Layer already hidden
	if ( layers[layer].visible == false )
		return false;

	// Hiding Layer
	layers[layer].visible = false;

	// Layer hasn't been generated yet
	if ( !layers[layer].layerGroup )
		return false;

	map.removeLayer(layers[layer].layerGroup);
}
