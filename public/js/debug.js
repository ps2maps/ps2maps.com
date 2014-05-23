console.log('Loading Debug');

var filters = config.filters;

var markers = filters.largeOutposts.markers.concat(filters.smallOutposts.markers);
markers = markers.concat(filters.facilities.markers);
markers = markers.concat(filters.warpgates.markers);
markers = markers.concat(filters.forwardSpawns.markers);

for(i in markers)
{
	markers[i].marker.setDraggable(true);
	google.maps.event.addListener(markers[i].marker, 'dragend', function(event)
	{
		var pixels = LatLngToPixels(event.latLng);

		$.post('/ajax/markerDrag', {'id':this.id, 'x': pixels[0], 'y':pixels[1]}, function(data)
		{
			console.log('Moved to: ' + pixels[0] + ',' + pixels[1]);
		});
	});
}

function insertLabelForwardSpawn(text)
{
	var position = map.getCenter();

	var label = labelForwardSpawn(0, text, LatLngToPixels(position));
	label.marker.setDraggable(true);

	config.filters.largeOutposts.overlay.addOverlay(label);
	config.filters.largeOutposts.overlay.show();

	var pixels = LatLngToPixels(position);

	$.post('/ajax/insertMarker', { 'x':pixels[0], 'y':pixels[1], 'marker_type_id': 11, 'text':text, 'continent_id': 3 }, function(data)
	{
		console.log(data);
		label.id = data;
	});

	google.maps.event.addListener(label.marker, 'dragend', function(event)
	{
		var pixels = LatLngToPixels(event.latLng);

		$.post('/ajax/markerDrag', {'id':this.id, 'x': pixels[0], 'y':pixels[1]}, function(data)
		{
			console.log('Moved to: ' + pixels[0] + ',' + pixels[1]);
		});
	});
}
