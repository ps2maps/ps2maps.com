// Create Markers
(function(){

	var facilities = continent.facilities,
		markerOptions = {};

	for( id in facilities )
	{
		facilities[id].loc[0] = facilities[id].loc[0] * 0.03126 + 128;
		facilities[id].loc[1] = facilities[id].loc[1] * 0.03126 + 128;

		var label = facilities[id].name;

		switch(facilities[id].type) {
			case 2:
			case 3:
			case 4:
				console.log(ps2maps.icons.facilities[facilities[id].type]);
				options = {
					icon: ps2maps.icons.facilities[facilities[id].type].ns,
					pane: 'facilitiesPane'
				};
				label += " Facility";
				break;
			case 5:
			case 6:
				console.log(ps2maps.icons.outposts[facilities[id].type]);
				options = {
					icon: ps2maps.icons.outposts[facilities[id].type].ns,
					pane: 'outpostsPane'
				};
				break;
			case 7:
				options = {
					icon: ps2maps.icons.facilities[facilities[id].type].ns,
					pane: 'facilitiesPane'
				};
				break;
		}
		var marker = L.marker(facilities[id].loc, options)
			.bindLabel(label, ps2maps.options.labels.default)
			.addTo(ps2maps.map);
		continue;

		// The Marker's Icon
		var icon = L.divIcon({
			className: 'icon ' + marker_data[layer].icon.className,
			iconSize: [ marker_data[layer].icon.size.x, marker_data[layer].icon.size.y ],
			iconAnchor: [ marker_data[layer].icon.anchor.x, marker_data[layer].icon.anchor.y]
		});

		// Set the options
		var options = marker_data[layer].options;
		options.icon = icon;

		var objects = [];
		for( index in marker_data[layer].markers )
		{
			// Create the Marker
			var object = L.marker( [marker_data[layer].markers[index].lat, marker_data[layer].markers[index].lng], options );

			// Set the ID
			object.id = marker_data[layer].markers[index].id;

			// Set the Marker Type
			object.marker_type = layer;

			// Set the Marker Text
			object.text = marker_data[layer].markers[index].text;

			// Bind Label
			if ( marker_data[layer].hasLabel )
				object.bindLabel(marker_data[layer].markers[index].text, marker_data[layer].labelOptions);

			// Territory
			if ( marker_data[layer].markers[index].territory_id )
				object.territory = territories[ marker_data[layer].markers[index].territory_id ];

			// Push to objects array
			objects.push(object);

			// Push to global markers array
			markers[ marker_data[layer].markers[index].id ] = object;
		}

		// Create the LayerGroup
		layers[layer].layerGroup = L.layerGroup(objects);

		// Show Labels if exist
		if ( marker_data[layer].hasLabel )
			layers[layer].has_label = true;
	}
})();
