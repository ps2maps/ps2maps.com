function insertMarker(type, text)
{
	console.log('Creating: ' + type);

	var center = map.getCenter();

	var icon = null;
	var marker_type_id = null;

	switch(type)
	{
		case 'warpgate':
			icon = icons.neutral.warpgate;
			marker_type_id = 1;
			if ( !text )
				text = window.prompt('warpgate');
			break;
		case 'ampstation':
			icon = icons.neutral.ampStation;
			marker_type_id = 6;
			if ( !text )
				text = window.prompt('ampstation');
			break;
		case 'biolab':
			icon = icons.neutral.bioLab;
			marker_type_id = 4;
			if ( !text )
				text = window.prompt('biolab');
			break;
		case 'techplant':
			icon = icons.neutral.techPlant;
			marker_type_id = 5;
			if ( !text )
				text = window.prompt('techplant');
			break;
		case 'largeoutpost':
			icon = icons.neutral.largeOutpost;
			marker_type_id = 2;
			if ( !text )
				text = window.prompt('largeoutpost');
			break;
		case 'smalloutpost':
			icon = icons.neutral.smallOutpost;
			marker_type_id = 3;
			if ( !text )
				text = window.prompt('smalloutpost');
			break;
		case 'forwardspawnlabeled':
			icon = icons.neutral.forwardSpawnLabeled;
			marker_type_id = 11;
			if ( !text )
				text = window.prompt('forwardspawnlabeled');
			break;
		case 'forwardspawn':
			icon = icons.neutral.forwardSpawn;
			marker_type_id = 28;
			break;
		case 'terminal.aircraft':
			icon = icons.neutral.aircraftTerminal;
			marker_type_id = 13;
			break;
		case 'terminal.groundvehicle':
			icon = icons.neutral.groundVehicleTerminal;
			marker_type_id = 14;
			break;
		case 'terminal.galaxy':
			icon = icons.neutral.galaxyTerminal;
			marker_type_id = 15;
			break;
		case 'terminal.groundtransport':
			icon = icons.neutral.groundTransportTerminal;
			marker_type_id = 16;
			break;
		case 'terminal.equipment':
			icon = icons.neutral.equipmentTerminal;
			marker_type_id = 17;
			break;
		case 'ammotower':
			icon = icons.neutral.ammoTower;
			marker_type_id = 18;
			break;
		case 'landingpad':
			icon = icons.neutral.landingPad;
			marker_type_id = 19;
			break;
		case 'generator.spawncontrolunitshield':
			icon = icons.neutral.spawnControlUnitShieldGenerator;
			marker_type_id = 20;
			break;
		case 'spawncontrolunit':
			icon = icons.neutral.spawnControlUnit;
			marker_type_id = 21;
			break;
		case 'spawntube':
			icon = icons.neutral.spawnTube;
			marker_type_id = 22;
			break;
		case 'generator.horizontalshield':
			icon = icons.neutral.horizontalShieldGenerator;
			marker_type_id = 23;
			break;
		case 'generator.verticalshield':
			icon = icons.neutral.verticalShieldGenerator;
			marker_type_id = 24;
			break;
		case 'generator.gateshield':
			icon = icons.neutral.gateShieldGenerator;
			marker_type_id = 25;
			break;
		case 'teleporter':
			icon = icons.neutral.teleporter;
			marker_type_id = 26;
			break;
		case 'terminal.warpgate':
			icon = icons.neutral.warpgateTerminal;
			marker_type_id = 27;
			break;
		case 'capturepoint':
			icon = icons.neutral.capturePoint;
			marker_type_id = 12;
			if ( !text )
				text = window.prompt('capturepoint');
			break;
	}

	// Incorrect type given
	if ( !marker_type_id )
	{
		console.log('Unknown Type');
		return false;
	}

	var labelOptions = {
		noHide: true
	};

	// Add extra ClassName for capture point markers
	if ( marker_type_id == 12 )
	{
		labelOptions.className = 'leaflet-label label-capture-point';
	}

	// Create the Marker
	var marker = null;
	if ( text && text != '' )
		marker = L.marker(center, { icon: icon, draggable: true }).bindLabel(text, labelOptions).addTo(map).showLabel();
	else
		marker = L.marker(center, { icon: icon, draggable: true }).addTo(map);
	marker._icon.style.pointerEvents = 'all';

	marker.continent_id = continent.id;
	marker.marker_type_id = marker_type_id;
	marker.on('dragend', function(e)
	{
		// Determine the Territory the Marker is in
		var territory = null;
		for( id in layers.territories._layers )
		{
			if ( isPointInPoly(layers.territories._layers[id]._latlngs, this._latlng) )
			{
				territory = layers.territories._layers[id];
				break;
			}
		}

		var territory_id;
		if ( territory )
		{
			territory_id = territory.id;
		}

		// Ajax Data
		var data = {
			id: this.id,
			lat: this._latlng.lat,
			lng: this._latlng.lng,
			text: text,
			marker_type_id: marker_type_id,
			continent_id: continent.id,
			territory_id: territory_id
		};

		// Create/Update Marker via Ajax
		$.post('ajax/updateMarker', data, function(response)
		{
			e.target.id = response.id;
			e.target.territory_id = territory_id;
			console.log(type + ' updated: ', e.target, response);
		}).fail(function()
		{
			alert('Failed to Update Marker. Are you logged in?');
		});
	});

	marker.fire('dragend');

	return marker;
}

function isPointInPoly(polygon, latlng)
{
	for(var c = false, i = -1, l = polygon.length, j = l - 1; ++i < l; j = i)
	{
		((polygon[i].lat <= latlng.lat && latlng.lat < polygon[j].lat) || (polygon[j].lat <= latlng.lat && latlng.lat < polygon[i].lat))
		&& (latlng.lng < (polygon[j].lng - polygon[i].lng) * (latlng.lat - polygon[i].lat) / (polygon[j].lat - polygon[i].lat) + polygon[i].lng)
		&& (c = !c);
	}
	return c;
}

function insertMarkerGroup(type)
{
	switch(type)
	{
		case 'smalloutpost':
			insertMarker('smalloutpost');
			map.panBy([32,0]);
			insertMarker('spawntube');
			map.panBy([32,0]);
			insertMarker('terminal.equipment');
			map.panBy([32,0]);
			insertMarker('capturepoint','A');
			map.panBy([32,0]);
			insertMarker('terminal.groundtransport');
			map.panBy([32,0]);
			insertMarker('ammotower');
			break;

		case 'tower':
			insertMarker('spawntube');
			map.panBy([32,0]);
			insertMarker('terminal.equipment');
			map.panBy([32,0]);
			insertMarker('terminal.aircraft');
			map.panBy([32,0]);
			insertMarker('terminal.aircraft');
			map.panBy([32,0]);
			insertMarker('terminal.aircraft');
			map.panBy([32,0]);
			insertMarker('terminal.aircraft');
			map.panBy([32,0]);
			insertMarker('terminal.groundvehicle');
			map.panBy([32,0]);
			insertMarker('terminal.groundvehicle');
			map.panBy([32,0]);
			insertMarker('landingpad');
			map.panBy([32,0]);
			insertMarker('landingpad');
			map.panBy([32,0]);
			insertMarker('landingpad');
			map.panBy([32,0]);
			insertMarker('landingpad');
			break;

		case 'largeoutposttower':
			insertMarker('largeoutpost');
			map.panBy([32,0]);
			insertMarkerGroup('tower');
			map.panBy([32,0]);
			insertMarker('capturepoint', 'A');
			break;

		case 'forwardspawntower':
			insertMarker('forwardspawnlabeled');
			map.panBy([32,0]);
			insertMarker('forwardspawn');
			map.panBy([32,0]);
			insertMarkerGroup('tower');
			break;

		case 'ABC':
			insertMarker('capturepoint','A');
			map.panBy([32,0]);
			insertMarker('capturepoint','B');
			map.panBy([32,0]);
			insertMarker('capturepoint','C');
			break;

		case 'ABCD':
			insertMarkerGroup('ABC');
			map.panBy([32,0]);
			insertMarker('capturepoint','D');
			break;

		case 'warpgate':
			insertMarker('warpgate');
			map.panBy([32,0]);
			insertMarker('terminal.warpgate');
			map.panBy([32,0]);
			insertMarker('spawntube');
			map.panBy([32,0]);
			insertMarker('terminal.equipment');
			map.panBy([32,0]);
			insertMarker('terminal.equipment');
			map.panBy([32,0]);
			insertMarker('landingpad');
			map.panBy([32,0]);
			insertMarker('landingpad');
			map.panBy([32,0]);
			insertMarker('terminal.groundvehicle');
			map.panBy([32,0]);
			insertMarker('terminal.groundvehicle');
			map.panBy([32,0]);
			insertMarker('terminal.aircraft');
			map.panBy([32,0]);
			insertMarker('terminal.aircraft');
			map.panBy([32,0]);
			insertMarker('terminal.galaxy');
			map.panBy([32,0]);
			insertMarker('terminal.galaxy');
			map.panBy([32,0]);
			insertMarker('terminal.equipment');
			map.panBy([32,0]);
			insertMarker('terminal.equipment');
			map.panBy([32,0]);
			insertMarker('ammotower');
			map.panBy([32,0]);
			insertMarker('ammotower');
			break;

		case 'forwardspawn':
			insertMarker('forwardspawnlabeled');
			map.panBy([32,0]);
			insertMarker('forwardspawn');
			map.panBy([32,0]);
			insertMarker('spawntube');
			map.panBy([32,0]);
			insertMarker('terminal.equipment');
			map.panBy([32,0]);
			break;

		case 'ampstation':
			insertMarker('ampstation');
			map.panBy([32,0]);
			insertMarker('capturepoint','A');
			map.panBy([32,0]);
			insertMarker('spawncontrolunit');
			map.panBy([32,0]);
			insertMarker('generator.spawncontrolunitshield');
			map.panBy([32,0]);
			insertMarker('terminal.groundvehicle');
			map.panBy([32,0]);
			insertMarker('terminal.groundvehicle');
			map.panBy([32,0]);
			insertMarker('generator.gateshield');
			map.panBy([32,0]);
			insertMarker('generator.gateshield');
			map.panBy([32,0]);
			insertMarker('generator.horizontalshield');
			map.panBy([32,0]);
			insertMarker('generator.verticalshield');
			map.panBy([32,0]);
			insertMarker('spawntube');
			map.panBy([32,0]);
			insertMarker('terminal.equipment');
			map.panBy([32,0]);
			insertMarker('ammotower');
			map.panBy([32,0]);
			insertMarker('ammotower');
			map.panBy([32,0]);
			insertMarker('landingpad');
			map.panBy([32,0]);
			insertMarker('landingpad');
			map.panBy([32,0]);
			insertMarker('terminal.aircraft');
			break;

		case 'techplant':
			insertMarker('techplant');
			map.panBy([32,0]);
			insertMarker('capturepoint','A');
			map.panBy([32,0]);
			insertMarker('spawncontrolunit');
			map.panBy([32,0]);
			insertMarker('generator.spawncontrolunitshield');
			map.panBy([32,0]);
			insertMarker('terminal.equipment');
			map.panBy([32,0]);
			insertMarker('terminal.aircraft');
			map.panBy([32,0]);
			insertMarker('terminal.galaxy');
			map.panBy([32,0]);
			insertMarker('terminal.groundvehicle');
			map.panBy([32,0]);
			insertMarker('terminal.groundvehicle');
			map.panBy([32,0]);
			insertMarker('landingpad');
			map.panBy([32,0]);
			insertMarker('spawntube');
			map.panBy([32,0]);
			insertMarker('terminal.equipment');
			map.panBy([32,0]);
			insertMarker('generator.horizontalshield');
			map.panBy([32,0]);
			insertMarker('generator.verticalshield');
			map.panBy([32,0]);
			insertMarker('terminal.equipment');
			map.panBy([32,0]);
			insertMarker('terminal.equipment');
			map.panBy([32,0]);
			insertMarker('terminal.groundvehicle');
			map.panBy([32,0]);
			insertMarker('ammotower');
			map.panBy([32,0]);
			insertMarker('ammotower');
			break;

		case 'biolab':
			insertMarker('biolab');
			map.panBy([32,0]);
			insertMarker('capturepoint', 'A');
			map.panBy([32,0]);
			insertMarker('capturepoint', 'B');
			map.panBy([32,0]);
			insertMarker('capturepoint', 'C');
			map.panBy([32,0]);
			insertMarker('landingpad');
			map.panBy([32,0]);
			insertMarker('landingpad');
			map.panBy([32,0]);
			insertMarker('terminal.aircraft');
			map.panBy([32,0]);
			insertMarker('terminal.aircraft');
			map.panBy([32,0]);
			insertMarker('terminal.equipment');
			map.panBy([32,0]);
			insertMarker('spawntube');
			map.panBy([32,0]);
			insertMarker('generator.spawncontrolunitshield');
			map.panBy([32,0]);
			insertMarker('spawncontrolunit');
			map.panBy([32,0]);
			insertMarker('terminal.groundvehicle');
			map.panBy([32,0]);
			insertMarker('terminal.groundvehicle');
			map.panBy([32,0]);
			insertMarker('terminal.equipment');

			break;
	}
}
