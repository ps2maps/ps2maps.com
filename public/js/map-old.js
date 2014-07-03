ps2maps = {};
if ( typeof layers == 'undefined' )
	layers = {}

// Custom Projection
L.Projection.LatLon = {
	project: function (latlng) {
		return new L.Point(latlng.lat, latlng.lng);
	},
	unproject: function (point) {
		return new L.LatLng(point.x, point.y);
	}
};

// Custom CRS
L.CRS.InvertedCartesian = L.extend({}, L.CRS, {
	projection: L.Projection.LatLon,
	transformation: new L.Transformation(1, 0, 1, 0),
	scale: function (zoom) {
		return Math.pow(2, zoom);
	}
});

// Map Creation
tileUrl = "http://cdn{s}.ps2maps.com/tiles/" + continent.slug + "/" + tileVersion + "/zoom{z}/tile_{z}_{x}_{y}.jpg";
var map = L.map('map',
{
	crs: L.CRS.InvertedCartesian,
	minZoom: continent.minZoom,
	maxZoom: continent.maxZoom,
	attributionControl: false,
	layers: [
		L.tileLayer(tileUrl,
		{
			noWrap: true,
			subdomains: '0123'
		})
	]
}).setView([defaultView.lat,defaultView.lng], defaultView.zoom);

// Marker Icons
var icons = {
	ampStation: {
		ns: L.divIcon({
			className: 'icon amp-station',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		nc: L.divIcon({
			className: 'icon amp-station nc',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		tr: L.divIcon({
			className: 'icon amp-station tr',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		vs: L.divIcon({
			className: 'icon amp-station vs',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	bioLab: {
		ns: L.divIcon({
			className: 'icon bio-lab',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		nc: L.divIcon({
			className: 'icon bio-lab nc',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		tr: L.divIcon({
			className: 'icon bio-lab tr',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		vs: L.divIcon({
			className: 'icon bio-lab vs',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	techPlant: {
		ns: L.divIcon({
			className: 'icon tech-plant',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		nc: L.divIcon({
			className: 'icon tech-plant nc',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		tr: L.divIcon({
			className: 'icon tech-plant tr',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		vs: L.divIcon({
			className: 'icon tech-plant vs',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	largeOutpost: {
		ns: L.divIcon({
			className: 'icon large-outpost',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		nc: L.divIcon({
			className: 'icon large-outpost nc',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		tr: L.divIcon({
			className: 'icon large-outpost tr',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		vs: L.divIcon({
			className: 'icon large-outpost vs',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	smallOutpost: {
		ns: L.divIcon({
			className: 'icon small-outpost',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		nc: L.divIcon({
			className: 'icon small-outpost nc',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		tr: L.divIcon({
			className: 'icon small-outpost tr',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		vs: L.divIcon({
			className: 'icon small-outpost vs',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	warpgate: {
		ns: L.divIcon({
			className: 'icon warpgate',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		nc: L.divIcon({
			className: 'icon warpgate nc',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		tr: L.divIcon({
			className: 'icon warpgate tr',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		vs: L.divIcon({
			className: 'icon warpgate vs',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	forwardSpawnLabeled: {
		ns: L.divIcon({
			className: 'icon forward-spawn',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
	},
	forwardSpawn: {
		ns: L.divIcon({
			className: 'icon forward-spawn',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
	},
	aircraftTerminal: {
		ns: L.divIcon({
			className: 'icon aircraft-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	galaxyTerminal: {
		ns: L.divIcon({
			className: 'icon galaxy-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	groundVehicleTerminal: {
		ns: L.divIcon({
			className: 'icon ground-vehicle-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	groundTransportTerminal: {
		ns: L.divIcon({
			className: 'icon ground-transport-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	equipmentTerminal: {
		ns: L.divIcon({
			className: 'icon equipment-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	warpgateTerminal: {
		ns: L.divIcon({
			className: 'icon warpgate-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	verticalShieldGenerator: {
		ns: L.divIcon({
			className: 'icon vertical-shield-generator',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	horizontalShieldGenerator: {
		ns: L.divIcon({
			className: 'icon horizontal-shield-generator',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	gateShieldGenerator: {
		ns: L.divIcon({
			className: 'icon gate-shield-generator',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	spawnControlUnitShieldGenerator: {
		ns: L.divIcon({
			className: 'icon scu-shield-generator',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	spawnBeacon: {
		ns: L.divIcon({
			className: 'icon spawn-beacon',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	spawnControlUnit: {
		ns: L.divIcon({
			className: 'icon spawn-control-unit',
			iconSize: [64,32],
			iconAnchor: [32,16]
		}),
	},
	teleporter: {
		ns: L.divIcon({
			className: 'icon teleporter',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	spawnTube: {
		ns: L.divIcon({
			className: 'icon spawn-tube',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	ammoTower: {
		ns: L.divIcon({
			className: 'icon ammo-tower',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	landingPad: {
		ns: L.divIcon({
			className: 'icon landing-pad',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	capturePoint: {
		ns: L.divIcon({
			className: 'icon capture-point',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	}
}

// Map Zoomend Event
map.on('zoomend', function(e)
{
	if ( typeof layers != 'undefined' )
		checkLayers();
});

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

// Create Territories
(function(){
	if ( typeof territory_data == 'undefined' )
		return false;

	var options = {
		weight: 1.2,
		color: '#333',
		opacity: 1,
		fillOpacity: 0
	};

	territories = [];
	var objects = [];

	for( index in territory_data )
	{
		var object = L.polygon( territory_data[index].points, options );
		object.id = territory_data[index].id;
		object.name = territory_data[index].name;
		object.type_id = territory_data[index].type_id;
		object.resource = territory_data[index].resource;
		object.markers = [];
		objects.push(object);
		territories[territory_data[index].id] = object;
	}
	territoriesLayer = L.layerGroup(objects);
	territoriesLayer.eachLayer(function(layer){ layer.on('click', function(e){ territoryClick(e) }).on('mouseover', function(e){ territoryOver(e) }).on('mouseout', function(e){ territoryOut(e) }); });
})();

// Create Markers
(function(){
	if ( typeof markers == 'undefined' )
		markers = [];

	if ( typeof layers == 'undefined' )
		return false;

	for( var layer in layers )
	{
		if ( !marker_data[layer] )
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
});

// Territory Markers Relationship
// for( i in markers )
// {
// 	if ( markers[i].territory )
// 		markers[i].territory.markers.push(markers[i]);
// }

// Warpgate Marker Ownership
(function(){

	if ( !server )
		return false;

	var data = {
		server_slug: server.slug,
		warpgates: []
	};
	for( var i in marker_data.warpgate.markers )
	{
		data.warpgates.push( { marker_id: marker_data.warpgate.markers[i].id, territory_id: markers[marker_data.warpgate.markers[i].id].territory.id } );
	}

	$.post('/ajax/warpgateOwnership', data, function(response)
	{
		for( id in response )
		{
			if ( factions[response[id]] )
			{
				var text = continent.name + " " + factions[response[id]].code.toUpperCase() + " Warpgate";
				markers[id].hideLabel().bindLabel(text).showLabel();
			}
		}
	});


});

ps2maps.lattice = function(map, markerA, markerB)
{
	// Checking for parameters
	if ( !map || typeof map == 'undefined' )
		throw("Missing parameter: map");
	if ( !markerA || typeof markerA == 'undefined' )
		throw("Missing parameter: markerA");
	if ( !markerB || typeof markerB == 'undefined' )
		throw("Missing parameter: markerB");

	// Class members
	this._map = map;
	this._markerA = markerA;
	this._markerB = markerB;
	this._line = null;
	this._outline = null;

	// Styles
	this._styles = {
		ns: {
			line: {
				color: '#79e0e1',
				opacity: 1,
				weight: 4,
				clickable: false
			},
			outline: {
				color: '#FFF',
				opacity: 1,
				weight: 6,
				clickable: false
			}
		},
		nc: {
			line: {
				color: 'hsl(204,100%,60%)',
				opacity: 1,
				weight: 5,
				clickable: false
			},
			outline: {
				color: '#FFF',
				opacity: 1,
				weight: 7,
				clickable: false
			}
		},
		tr: {
			line: {
				color: 'hsl(0,75%,50%)',
				opacity: 1,
				weight: 5,
				clickable: false
			},
			outline: {
				color: '#FFF',
				opacity: 1,
				weight: 7,
				clickable: false
			}
		},
		vs: {
			line: {
				color: 'hsl(272,70%,60%)',
				opacity: 1,
				weight: 5,
				clickable: false
			},
			outline: {
				color: '#FFF',
				opacity: 1,
				weight: 7,
				clickable: false
			}
		},
		contested: {
			line: {
				color: '#FFFF00',
				opacity: 1,
				weight: 5,
				clickable: false,
				dashArray: [1,6]
			},
			outline: {
				color: '#000',
				opacity: 1,
				weight: 6,
				clickable: false
			}
		}
	};

	this.redraw();

	return this;
};
ps2maps.lattice.prototype.setMarkerA = function(markerA)
{
	this._markerA = markerA;

	return this;
}
ps2maps.lattice.prototype.setMarkerB = function(markerB)
{
	this._markerB = markerB;

	return this;
}
ps2maps.lattice.prototype.setMarkers = function(markerA, markerB)
{
	this._markerA = markerA;
	this._markerB = markerB;

	return this;
}
ps2maps.lattice.prototype.redraw = function()
{
	var aLatLng = this._markerA.getLatLng();
	var bLatLng = this._markerB.getLatLng();

	var points = [
		[ aLatLng.lat, aLatLng.lng],
		[ bLatLng.lat, bLatLng.lng]
	];

	this._outline =  new L.polyline(points, this._styles.ns.outline);
	this._line = new L.polyline(points, this._styles.ns.line);

	return this;
}
ps2maps.lattice.prototype.show = function()
{
	this._outline.addTo(this._map);
	$(this._outline._container).find('path').attr('class','nomouse');
	this._line.addTo(this._map);
	$(this._line._container).find('path').attr('class','nomouse');
	this.visible = true;


	return this;
}
ps2maps.lattice.prototype.hide = function()
{
	this._map.removeLayer(this._line);
	this._map.removeLayer(this._outline);
	this.visible = false;

	return this;
}
ps2maps.lattice.prototype.bringToFront = function()
{
	this._outline.bringToFront();
	this._line.bringToFront();
}
ps2maps.lattice.prototype.setFaction = function(faction)
{
	this._outline.setStyle(this._styles[faction].outline);
	this._line.setStyle(this._styles[faction].line);

	return this;
};

// Create Lattice
(function(){
	lattice = [];

	if ( typeof lattice_data == 'undefined' )
		return false;

	for( id in lattice_data )
	{
		lattice[id] = new ps2maps.lattice(map, markers[ lattice_data[id].a_id ], markers[ lattice_data[id].b_id ]);
		lattice[id].visible = false;
	}
})();



var noColorStyle = {
	fillOpacity: 0,
	color: '#000',
	opacity: 1
};

// Faction Data
var factions = {
	1: {
		id: 1,
		name: 'Vanu Sovereignty',
		code: 'vs',
		defaultStyle: {
			weight: 1.2,
			fillColor: 'hsl(272,70%,60%)',
			fillOpacity: 0.4,
			color: '#000'
		},
		hoverStyle: {
			fillColor: 'hsl(272,70%,30%)',
		},
		territoryCount: 0,
		resources: {
			 2: 0, // Aerospace
			 3: 0, // Mechanized
			 4: 0  // Infantry
		}
	},
	2: {
		id: 2,
		name: 'New Conglomerate',
		code: 'nc',
		defaultStyle: {
			weight: 1.2,
			fillColor: 'hsl(204,100%,60%)',
			fillOpacity: 0.4,
			color: '#000'
		},
		hoverStyle: {
			fillColor: 'hsl(204,100%,30%)',
		},
		territoryCount: 0,
		resources: {
			 2: 0, // Aerospace
			 3: 0, // Mechanized
			 4: 0  // Infantry
		}
	},
	3: {
		id: 3,
		name: 'Terran Republic',
		code: 'tr',
		defaultStyle: {
			weight: 1.2,
			fillColor: 'hsl(0,75%,50%)',
			fillOpacity: 0.4,
			color: '#000'
		},
		hoverStyle: {
			fillColor: 'hsl(0,75%,25%)',
		},
		territoryCount: 0,
		resources: {
			 2: 0, // Aerospace
			 3: 0, // Mechanized
			 4: 0  // Infantry
		}
	}
};

// Resources
var resources = {
	2: { // Aerospace
		name: 'Aerospace',
		className: 'aerospace',
		defaultStyle: {
			fillColor: 'hsl(146, 76%, 43%)',
			fillOpacity: 0.5,
			color: '#333',
			weight: 1.2
		},
		hoverStyle: {
			fillColor: 'hsl(146, 76%, 33%)'
		}
	},
	3: { // Mechanized
		name: 'Mechanized',
		className: 'mechanized',
		defaultStyle: {
			fillColor: 'hsl(37, 77%, 45%)',
			fillOpacity: 0.5,
			color: '#333',
			weight: 1.2
		},
		hoverStyle: {
			fillColor: 'hsl(37, 77%, 35%)',
		}
	},
	4: { // Infantry
		name: 'Infantry',
		className: 'infantry',
		defaultStyle: {
			fillColor: 'hsl(59, 89%, 54%)',
			fillOpacity: 0.5,
			color: '#333',
			weight: 1.2
		},
		hoverStyle: {
			fillColor: 'hsl(59, 89%, 44%)'
		}
	}
}

var territory_types = {
	2: {
		name: 'Amp Station',
		className: 'amp-station'
	},
	3: {
		name: 'Bio Lab',
		className: 'bio-lab'
	},
	4: {
		name: 'Tech Plant',
		className: 'tech-plant'
	},
	5: {
		name: 'Large Outpost',
		className: 'large-outpost'
	},
	6: {
		name: 'Small Outpost',
		className: 'small-outpost'
	},
	7: {
		name: 'Warpgate',
		className: 'warpgate'
	}
};

var firstRun = true;
function fetchTerritoryControl()
{
	var data = { server_slug: server.slug };

	$.post('/ajax/region-control', data, function(){})
	.done(function(response)
	{
		console.log(response);

		if ( !response )
			return false;

		// Territory Info Panel
		var territoryId = $('#territory-info').attr('data-territory-id');

		// Reset Resource Totals and Territory Count
		for( id in factions )
		{
			factions[id].resources = { 2: 0, 3: 0, 4: 0 };
			factions[id].territoryCount = 0;
		}

		console.log(factions);



		return false;


		if ( response )
		{
			console.log(response);

			// Territory Info Panel
			var territoryId = $('#territory-info').attr('data-territory-id');

			// Reset Resource Totals and Territory Count
			for( id in factions )
			{
				factions[id].resources = { 2: 0, 3: 0, 4: 0 };
				factions[id].territoryCount = 0;
			}

			// Update Each Territory
			territoriesLayer.eachLayer(function(layer)
			{
				var faction_id = response.regions[layer.id].faction_id;

				if ( factions[faction_id] && ( !layer.faction || layer.faction.id != faction_id ) )
				{
					// Set the faction ownership of the territory
					layer.faction = factions[faction_id];
					layer.timestamp = response.regions[layer.id].timestamp;

					// Change territory color
					if ( territoriesLayer.colors == 'factions' )
					{
						// Set normal style on initial load
						if ( firstRun )
						{
							layer.setStyle( factions[faction_id].defaultStyle );
						}
						// Transition Style for newly changed territories
						else
						{
							d3.select(layer._path)
								.transition().duration(1000).attr({fill: layer.faction.defaultStyle.fillColor, 'fill-opacity': 1})
								.transition().duration(5000).attr({'fill-opacity': 0.5});
						}
					}

					// Change Territory Marker Icon color
					if ( layer.markers )
					{
						for( i in layer.markers )
						{
							layer.markers[i].faction = layer.faction;
							layer.markers[i].setIcon(icons[layer.markers[i].marker_type][layer.markers[i].faction.code]);
						}
					}
				}

				// Add Resource to Faction
				factions[faction_id].resources[layer.resource.id] += layer.resource.count;
				factions[faction_id].territoryCount += 1;

				// Update Territory Info Panel
				if ( layer.id == territoryId )
				{
					layer.fireEvent('click');
				}
			});

			// Update Lattice
			for( id in lattice )
			{
				faction_a = lattice[id]._markerA.territory.faction.code;
				faction_b = lattice[id]._markerB.territory.faction.code;

				// Same Faction Ownership
				if ( faction_a == faction_b )
				{
					lattice[id].setFaction(faction_a);
				}

				// Contested
				else
				{
					lattice[id].setFaction('contested');
				}

				if ( lattice[id].visible == true )
					lattice[id].bringToFront();
			}

			updateTerritoryChart();
			updateResourceCharts();

			_gaq.push(['_trackEvent', 'ajax', 'fetchTerritoryControl', server.name]);

			firstRun = false;
		}
	});
}

// Territory MouseOver
var territoryPathParent = null;
function territoryOver(e)
{
	// if ( !territoryPathParent )
	// 	territoryPathParent = $('.leaflet-overlay-pane > svg').first();

	// Can't do this now because it will go over the lattice
	// e.target.bringToFront();

	if ( territoriesLayer.colors == 'factions' && e.target.faction )
	{
		e.target.setStyle(factions[e.target.faction.id].hoverStyle);
	}
	else if ( territoriesLayer.colors == 'resources' )
	{
		e.target.setStyle(resources[e.target.resource.id].hoverStyle);
	}
}
function territoryOut(e)
{
	if ( territoriesLayer.colors == 'factions' && e.target.faction )
	{
		e.target.setStyle(factions[e.target.faction.id].defaultStyle);
	}
	else if ( territoriesLayer.colors == 'resources' )
	{
		e.target.setStyle(resources[e.target.resource.id].defaultStyle);
	}
}

// Territory Clicking
function territoryClick(e)
{
	$('#territory-info .initial').remove();
	$('#territory-info .wrapper').show();

	var territory = e.target;

	$('#territory-info')
		.attr('data-territory-id', territory.id);

	// Territory Type
	$('#territory-info .territory-icon').attr('class', 'territory-icon icon ' + territory_types[territory.type_id].className + ' ' + territory.faction.code);

	// Resource
	$('#territory-info .resource-icon').attr('class', 'resource-icon icon ' + resources[territory.resource.id].className);
	$('#territory-info .resource-name').text(resources[territory.resource.id].name).data('id',territory.id);
	$('#territory-info .resource-count').text(territory.resource.count);

	// Faction
	$('#territory-info .faction-icon').attr('class', 'faction-icon icon ' + territory.faction.code);
	$('#territory-info .faction-name').text(territory.faction.name);

	if ( territory_types[territory.type_id].name == "Warpgate" )
	{
		$('#territory-info .captured').hide();

		// Name
		$('#territory-info .territory-name').text(continent.name + " " + territory.faction.code.toUpperCase() + " Warpgate");
	}
	else
	{
		// Name
		$('#territory-info .territory-name').text(territory.name);

		// Capture Time
		var time = moment.unix(territory.timestamp);
		var format = 'M/D/YYYY h:mm a';
		$('#territory-info .time').text( time.format(format) );
		$('#territory-info .since').text( time.fromNow() );
		$('#territory-info .captured').show();
	}

}

function setTerritoryColors(colors)
{
	if ( typeof territoriesLayer == 'undefined' )
		return false;

	territoriesLayer.colors = colors;
	switch( colors )
	{
		case 'factions':

			territoriesLayer.eachLayer(function(layer){
				if ( layer.faction )
					layer.setStyle(factions[layer.faction.id].defaultStyle)
			});

			if ( !territoriesLayer._map)
				territoriesLayer.addTo(map);

			break;

		case 'resources':

			territoriesLayer.eachLayer(function(layer){
				layer.setStyle(resources[layer.resource.id].defaultStyle)
			});

			if ( !territoriesLayer._map)
				territoriesLayer.addTo(map);

			break;

		case 'none':
			territoriesLayer.eachLayer(function(layer){
				layer.setStyle(noColorStyle);
			});

			if ( !territoriesLayer._map )
				territoriesLayer.addTo(map);

			break;

		default:
			map.removeLayer(territoriesLayer);
	}
}

// Charts
charts = {};

// Territory Donut Chart
function updateTerritoryChart()
{
	var data = [];

	// Calculate Total Amount of Territory
	var total = 0;
	for( id in factions )
		total += factions[id].territoryCount-3;

	// Build Data Array
	for( id in factions )
	{
		if ( factions[id].territoryCount-3 > 0 )
			data.push({ value: factions[id].territoryCount-3, percent: Math.round((factions[id].territoryCount-3)/total*100)+"%" ,color: factions[id].defaultStyle.fillColor, hoverColor: factions[id].hoverStyle.fillColor });
	}

	// Create
	if ( !charts.territory )
	{
		charts.territory = {};

		var w=140, h=120, r=50;

		charts.territory.pie = d3.layout.pie()
			.sort(null)
			.value(function(d)
			{
				return d.value;
			});

		charts.territory.arc = d3.svg.arc()
			.innerRadius(r/1.5)
			.outerRadius(r);

		charts.territory.arcHover = d3.svg.arc()
			.innerRadius(r/1.75)
			.outerRadius(r*1.05);

		charts.territory.svg = d3.select('#territoryChart')
			.data([data])
			.append('svg:svg')
			.attr('viewBox', '0 0 ' + w + ' ' + h)
			.attr('width','100%')
			.attr('height',h)
			.append('svg:g')
			.attr("transform", "translate(70,60)");

		charts.territory.paths = charts.territory.svg.selectAll('path')
			.data(charts.territory.pie)
			.enter()
			.append('svg:path')
			.attr('fill', function(d){ return d.data.color })
			.attr('stroke','#FFF')
			.attr('stroke-width','2')
			.attr('d',charts.territory.arc)
			.each(function(d)
			{
				this._current = d;
			})
			.on('mouseover', function(d)
			{
				d3.select(this).transition().duration(250).attr('d', charts.territory.arcHover);
				charts.territory.text.text(d.data.percent);
			})
			.on('mouseout', function(d)
			{
				d3.select(this).transition().duration(250).attr('d', charts.territory.arc);
				charts.territory.text.text('');
			});

		charts.territory.text = charts.territory.svg
			.append('svg:text')
			.attr('id','territoryChartText')
			.attr('transform', "translate(0,8)")
			.attr('text-anchor', 'middle')
			.attr("font-size", "24px")
			.attr('fill','#FFF');
	}
	// Update
	else
	{
		charts.territory.svg.data([data]);
		charts.territory.paths.data(charts.territory.pie);
		charts.territory.text.text('');
		charts.territory.paths.transition().duration(1000).attrTween('d',arcTween);
	}
}

// Chart Animation
function arcTween(a)
{
	var i = d3.interpolate(this._current, a);
	this._current = i(0);
	return function(t) {
	return charts.territory.arc(i(t));
	};
}
// Chart Animation
function arcTweenHover(a)
{
	var i = d3.interpolate(this._current, a);
	this._current = i(0);
	return function(t) {
	return charts.territory.arcHover(i(t));
	};
}

function createResourceChart(element, data)
{
	var topPadding = 1,
			bottomPadding = 20,
			width = 140,
			height = 60,
			barWidth = 30,
			barStrokeColor = '#FFF',
			barSpacing = (width - 3*barWidth)/4,
			fontSize = '16px',
			fontColor = '#FFF',
			y = d3.scale.linear()
				.domain([0, d3.max(data, function(d){ return d.value; })])
				.range([0, height]);

	var svg = d3.select(element)
		.append('svg')
		.attr('viewBox', '0 0 ' + width + ' ' + (height+topPadding+bottomPadding))
		.attr('width', '100%')
		.attr('height', height + topPadding + bottomPadding);

	var rects = svg.selectAll('rect')
		.data(data, function(d){ return d.id; })
		.enter()
		.append('rect')
		.attr('x', function(d,i){ return ( barSpacing * (i+1) + barWidth*i ) })
		.attr('y', function(d){ return height + topPadding - y(d.value) })
		.attr('width', barWidth )
		.attr('height', function(d) { return y(d.value) })
		.attr('fill', function(d) { return d.color })
		.attr('stroke', barStrokeColor)
		.attr('stroke-width', 2);

	var text = svg.selectAll('text')
		.data(data, function(d){ return d.id; })
		.enter()
		.append('text')
		.text(function(d){ return "+" + d.value; })
		.attr('x', function(d,i){ return ( barSpacing * (i+1) + barWidth*i + barWidth*.5) })
		.attr('y', function(d,i){ return height + topPadding + bottomPadding - 2; })
		.attr("text-anchor", "middle")
		.attr("font-size", fontSize)
		.attr("fill", fontColor)
		.style('text-shadow', '1px 1px 2px #000');

	return { svg: svg, rects: rects, text: text };

}

function updateResourceChart(chart, data)
{
	var topPadding = 1,
		height = 60,
		y = d3.scale.linear()
			.domain([0, d3.max(data, function(d){ return d.value; })])
			.range([0, height]);

	// Update Bars
	chart.rects
		.data(data)
		.transition().duration(1000)
		.attr('y', function(d){ return height + topPadding - y(d.value) })
		.attr('height', function(d) { return y(d.value) });

	// Update Text
	chart.text
		.data(data)
		.text(function(d){ return "+" + d.value; });
}

function updateResourceCharts()
{
	var data = {};

	var topPadding = 1,
			bottomPadding = 20,
			width = 140,
			height = 60,
			barWidth = 20,
			barStrokeColor = '#FFF',
			y = null,
			barSpacing = (width - 3 * barWidth)/(4),
			fontSize = '16px',
			fontColor = '#FFF';

	// Aerospace
	data.aerospace = [
		{ id: 2, value: factions[2].resources[2], color: factions[2].defaultStyle.fillColor },
		{ id: 3, value: factions[3].resources[2], color: factions[3].defaultStyle.fillColor },
		{ id: 1, value: factions[1].resources[2], color: factions[1].defaultStyle.fillColor }
	];

	// Create or Update Chart
	if ( !charts.aerospace )
		charts.aerospace = createResourceChart('#aerospaceChart', data.aerospace);
	else
		updateResourceChart(charts.aerospace, data.aerospace);

	// Mechanized
	data.mechanized = [
		{ id: 2, value: factions[2].resources[3], color: factions[2].defaultStyle.fillColor },
		{ id: 3, value: factions[3].resources[3], color: factions[3].defaultStyle.fillColor },
		{ id: 1, value: factions[1].resources[3], color: factions[1].defaultStyle.fillColor }
	];

	// Create or Update Chart
	if ( !charts.mechanized )
		charts.mechanized = createResourceChart('#mechanizedChart', data.mechanized);
	else
		updateResourceChart(charts.mechanized, data.mechanized);

	// Infantry
	data.infantry = [
		{ id: 2, value: factions[2].resources[4], color: factions[2].defaultStyle.fillColor },
		{ id: 3, value: factions[3].resources[4], color: factions[3].defaultStyle.fillColor },
		{ id: 1, value: factions[1].resources[4], color: factions[1].defaultStyle.fillColor }
	];

	// Create or Update Chart
	if ( !charts.infantry )
		charts.infantry = createResourceChart('#infantryChart', data.infantry);
	else
		updateResourceChart(charts.infantry, data.infantry);
};

// Grid
grid = null;
function createGrid()
{
	grid = {};
	opt = {
		color: '#FFF',
		weight: 1,
		opacity: 0.2,
		clickable: false
	};
	var objs = [],
	labels = {1:'A', 2:'B', 3:'C', 4:'D', 5:'E', 6:'F', 7:'G', 8:'H', 9:'I', 10:'J', 11:'K', 12:'L', 13:'M', 14:'N', 15:'O', 16:'P'};
	for( c=0, x=1; c<=256; c+=16, x++ )
	{
		for( d=0, y=1; d<256; d+=16, y++ )
		{
			objs.push(new L.DivLayer([c,d],{content:labels[x]+y, className:'leaflet-divlayer gridLabel'}));
		}
		objs.push(new L.polygon([[c,0],[c,256]], opt));
		objs.push(new L.polygon([[0,c],[256,c]], opt));
	}
	grid = L.layerGroup(objs);
	grid.eachLayer(function(layer){
		if ( layer._path )
			layer._path.setAttribute('pointer-events','none');
	});
};

// Sub Grid
// var subGrid = {};
// (function(){
// 	opt = {
// 		color: '#FFF',
// 		weight: 1,
// 		opacity: 0.3,
// 		clickable: false
// 	};
// 	var objs = [];
// 	for( c=0; c<=256; c+=16/3)
// 	{
// 		objs.push(new L.polygon([[c,0],[c,256]], opt));
// 		objs.push(new L.polygon([[0,c],[256,c]], opt));
// 	}
// 	objs.push(new L.polygon([[256,0],[256,256]], opt));
// 	objs.push(new L.polygon([[0,256],[256,256]], opt));
// 	subGrid.layerGroup = L.layerGroup(objs);
// })();

// Page Visibility Event
function visibilityChange()
{
	// If tab is visible and ajax call is queued, execute ajax, then create loop again
	if ( pageIsVisible() && typeof territoryControlQueue != 'undefined' && territoryControlQueue )
	{
		territoryControlLoop = createTerritoryControlInterval();
		territoryControlQueue = null;
	}
}
var visbilityProperty = getHiddenProp();
if ( visbilityProperty )
{
  var event = visbilityProperty.replace(/[H|h]idden/,'') + 'visibilitychange';
  document.addEventListener(event, visibilityChange);
}

// Create the Fetch Territory Control AJAX Loop
function createTerritoryControlInterval()
{
	fetchTerritoryControl();

	return setInterval(function()
	{
		// If page is hidden, queue up the ajax call, delete the interval
		if ( pageIsHidden() )
		{
			territoryControlQueue = true;
			window.clearInterval(territoryControlLoop);
		}
		// Otherwise, make ajax call like normal
		else
		{
			fetchTerritoryControl();
		}
	}, 30000); // 30 second interval
}

$(document).ready(function()
{
	// Check if visitor has visited this iteration of ps2maps.com
	if ( !cache.hasItem('visitorVersion5') )
	{
		cache.clear();
		cache.setItem('visitorVersion5', true);
	}

	// Checkbox Settings
	for( layer in layers )
	{
		var checkbox = $('#checkbox-'+layer);
		var checked = cache.getItem( 'layer.' + layer + '.visible', $(checkbox).data('default'));
		if ( checked == true )
			$(checkbox).prop('checked',true);
	}
	checkLayers();

	// Sidebar Visibility
	if ( cache.getItem('sidebar.visible', true) == false )
	{
		setTimeout(function(){
			$('#sidebar').addClass('closed');
		}, 250);
	}

	// Sidebar Handle
	$('#sidebar_handle').on('click', function()
	{
		var sidebar = $(this).parent();
		if ( $(sidebar).hasClass('closed') )
		{
			$(sidebar).removeClass('closed');
			cache.setItem('sidebar.visible', true);
		}
		else
		{
			$(sidebar).addClass('closed');
			cache.setItem('sidebar.visible', false);
		}
	});

	// Sidebar Layer Accordion Visibility
	if ( cache.getItem('sidebar.layers.visible', true) == true )
		$('#collapseLayers').collapse('show');
	if ( cache.getItem('sidebar.territory.visible', true) == true )
		$('#collapseTerritory').collapse('show');
	if ( cache.getItem('sidebar.stats.visible', true) == true )
		$('#collapseStats').collapse('show');

	// Sidebar Layers
	$('#collapseLayers').on('show', function()
	{
		cache.setItem('sidebar.layers.visible', true);
	}).on('hide', function()
	{
		cache.setItem('sidebar.layers.visible', false);
	});

	// Sidebar Territory
	$('#collapseTerritory').on('show', function()
	{
		cache.setItem('sidebar.territory.visible', true);
	}).on('hide', function()
	{
		cache.setItem('sidebar.territory.visible', false);
	});

	// Sidebar Stats
	$('#collapseStats').on('show', function()
	{
		cache.setItem('sidebar.stats.visible', true);
	}).on('hide', function()
	{
		cache.setItem('sidebar.stats.visible', false);
	});

	// Layer Checkboxes
	$('#icons-modal').on('change', 'input', function()
	{
		var zoom = map.getZoom();
		var checked = $(this).is(':checked');
		var dataLayers = $(this).data('layer').split('|');

		// Iterate through layers
		for( i in dataLayers )
		{
			checkLayer(dataLayers[i]);
		}

		// Save to local storage
		var id = $(this).attr('id').split('-');
		var layer = id[1];
		cache.setItem('layer.'+layer+'.visible', checked);
	});

	// Icons Modal - Check All
	$('#check-all').click(function(){
		$('#icons-modal input[type=checkbox]').prop('checked',true).trigger('change');
	});

	// Icons Modal - Check None
	$('#check-none').click(function(){
		$('#icons-modal input[type=checkbox]').prop('checked',false).trigger('change');
	});

	// Icons Modal - Default
	$('#check-default').click(function(){
		$('#icons-modal input[type=checkbox]').each(function()
		{
			if ( $(this).data('default') == true )
				$(this).prop('checked',true).trigger('change');
			else
				$(this).prop('checked',false).trigger('change');
		});
	});

	// Save Recent Server and Continent to Local Storage
	if ( server )
		cache.setItem('recent.server.slug',server.slug);
	if ( continent )
		cache.setItem('recent.continent.slug',continent.slug);

	// Permalink Modal
	$('#navbar-permalink').on('click', function()
	{
		var input = $('#permalink-input');
		var center = map.getCenter();
		var url = $(input).data('url') + '?x=' + center.lat + '&y=' + center.lng + '&z=' + map.getZoom();
		$(input).val(url);
		$('#permalink-modal').modal()
		$(input).select();
	});
	$('#permalink-modal').on('shown', function()
	{
		$('#permalink-input').select();
	});

	// Create Tooltips
	$('[data-toggle=tooltip]').tooltip();

	// Icons Modal
	$('#icons-modal-button').on('click', function()
	{
		$('#icons-modal').modal();
	});

	// Grid Button
	$('#grid-button').on('click', function(e)
	{
		// Enable Grid
		if ( !$(this).hasClass('active') )
		{
			if ( !grid )
				createGrid();

			grid.addTo(map);

			cache.setItem('grid.visible',true);
		}
		// Disable Grid
		else
		{
			map.removeLayer(grid);
			cache.setItem('grid.visible',false);
		}
	});
	// Grid Initialization
	if ( cache.getItem('grid.visible') == true )
	{
		$('#grid-button').trigger('click');
	}

	// Lattice Button
	$('#lattice-toggle').on('click', function(e)
	{
		// Enable
		if ( !$(this).hasClass('active') )
		{
			for( i in lattice )
				lattice[i].show();

			cache.setItem('lattice.visible',true);
		}
		// Disable
		else
		{
			for( i in lattice )
				lattice[i].hide();

			cache.setItem('lattice.visible',false);
		}
	});
	if ( cache.getItem('lattice.visible', true) == true )
	{
		$('#lattice-toggle').trigger('click');
	}

	// Territory Buttons
	$('#territoryRadioButtons button').on('click', function(e)
	{
		var value = $(this).data('colors');
		setTerritoryColors(value);
		cache.setItem('territories.colors', value);
	});
	$('#territory-radiobutton-' + cache.getItem('territories.colors', 'factions')).trigger('click');

	// Territory Control Init
	if ( typeof territoriesLayer != 'undefined' && server )
	{
		territoryControlLoop = createTerritoryControlInterval();
	}
});
