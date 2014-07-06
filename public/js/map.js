// Ps2maps Class
function Ps2maps()
{
	this.layers = {};
	this.styles = {};
	this.defaultView = {
		lat: 128,
		lng: 128,
		zoom: 2
	};
	this.options = {
		'regions' : {
			'default' :  {
				weight: 1.2,
				color: '#000',
				opacity: 1,
				fillOpacity: 0
			}
		}
	};
};

// Region On Click Handler
Ps2maps.prototype.regionClick = function(e)
{

};

// Region Mouse Over Handler
Ps2maps.prototype.regionMouseOver = function(e)
{

};

// Region Mouse Out Handler
Ps2maps.prototype.regionMouseOut = function(e)
{

};

// Map Move/Zoom Handler
Ps2maps.prototype.mapMoveZoom = function(e)
{
	var center = this.map.getCenter();
	history.replaceState(null, null, continent.slug+'#'+center.lat+','+center.lng+','+this.map.getZoom()+'z');
};

var ps2maps = new Ps2maps();

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

(function(){

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
	L.CRS.Screen = L.extend({}, L.CRS, {
		projection: L.Projection.LatLon,
		transformation: new L.Transformation(1, 0, 1, 0),
		scale: function (zoom) {
			return Math.pow(2, zoom);
		}
	});

	// Map Creation
	ps2maps.map = L.map('map',
	{
		crs: L.CRS.Screen,
		minZoom: -10,
		maxZoom: 7,
		attributionControl: false,
	})
	// Prevent Right-click context menu
	.on('contextmenu', function(e){});

	// Tile Layer
	var tilesUrl = tilesCdn + "/tiles/" + continent.slug + tileVersion + "/zoom{z}/tile_{z}_{x}_{y}.jpg";
	L.tileLayer(tilesUrl, {
		subdomains: '0123',
		noWrap: true,
		continuousWorld: true
	}).addTo(ps2maps.map);

	// Canvas Tiles (for debugging)
	// var canvasTiles = L.tileLayer.canvas({
	//     minZoom: 0,
	//     maxZoom: 16,
	//     attribution: 'Map data &copy; FooBar',
	//     continuousWorld: true,
	//     tms: true
	// });

	// canvasTiles.drawTile = function(canvas, point, zoom) {
	//     var context = canvas.getContext('2d');

	//     context.beginPath();
	//     context.rect(0, 0, 256, 256);
	//     context.lineWidth = 2;
	//     context.strokeStyle = 'white';
	//     context.stroke();

	//     context.font="20px Arial";
	//     context.fillStyle = 'white';
	//     context.fillText("x:" + point.x + " y:" + point.y + " z:" + zoom, 80, 140);
	// }

	// // add the layer to the map
	// canvasTiles.addTo(ps2maps.map);

	//Determine preset or default view
	var view = window.location.hash.slice(1,-1).split(','),
		lat,
		lng,
		zoom;

	// Do values exist and are they valid numbers?
	if ( view[0] && view[1] && view[2] && !isNaN(view[0]) && !isNaN(view[1]) && !isNaN(view[2]) ) {
		lat = view[0];
		lng = view[1];
		zoom = view[2];
	} else { // Use default values
		lat = ps2maps.defaultView.lat;
		lng = ps2maps.defaultView.lng;
		zoom = ps2maps.defaultView.zoom;
	}

	// Set the view
	ps2maps.map.setView([lat,lng],zoom);

	// Set the move & zoom handler
	// Do this after setting intial view or else URL is appended with default view hash
	ps2maps.map.on('moveend', ps2maps.mapMoveZoom.bind(ps2maps));

})();

// Create Regions
(function(){

	// territories = [];
	var regions = [], region;

	for( index in continent.regions )
	{
		region = L.polygon( continent.regions[index].polygon, ps2maps.options.regions.default )
			.on('click', ps2maps.regionClick)
			.on('mouseover', ps2maps.regionMouseOver)
			.on('mouseout', ps2maps.regionMouseOut);
		region.id = continent.regions[index].id;
		region.name = continent.regions[index].name;
		// region.type_id = continent.regions[index].type_id;
		// region.resource = continent.regions[index].resource;
		// region.markers = [];
		regions.push(region);
		// territories[regions[index].id] = region;
	}
	ps2maps.layers.regions = L.layerGroup(regions).addTo(ps2maps.map);
	regions = null;
	//territoriesLayer.eachLayer(function(layer){ layer.on('click', function(e){ territoryClick(e) }).on('mouseover', function(e){ territoryOver(e) }).on('mouseout', function(e){ territoryOut(e) }); });
})();

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
};

// Create Markers
(function(){

	for( id in continent.facilities )
	{
		continent.facilities[id].loc[0] = continent.facilities[id].loc[0] * 0.03126 + 128;
		continent.facilities[id].loc[1] = continent.facilities[id].loc[1] * 0.03126 + 128;
		var marker = L.marker(continent.facilities[id].loc)
			.bindPopup(continent.facilities[id].name)
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

(function(){
	var logWindow = $('.log');

	// Set height from localStorage or default value
	var height = cache.getItem('ps2maps.log.height');
	if ( !height || height <= 0 )
		height = '30%';
	logWindow.css('height', height);

	// Resize Handle
	$('.log-resize-handle').on('mousedown', function(e){
		var orig_h = logWindow.height(), pos_y = e.pageY;
		dragging = true;

		$(document).on('mousemove', function(e) {
			if (dragging) {
				var h = orig_h + (pos_y - e.pageY);
				logWindow.css('height', h);
				cache.setItem('ps2maps.log.height', h);
			}
		}).on('mouseup', function() {
			dragging = false;
		});

		e.preventDefault();
	});

});
