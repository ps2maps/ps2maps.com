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
		regions: {
			default:  {
				weight: 1.2,
				color: '#000',
				opacity: 1,
				fillOpacity: 0,
				pane: 'regionsPane'
			},
			hover: {
				color: '#EEE',
				weight: 3
			}
		},
		icons: {
			default: {
				className: 'svgIcon',
				iconSize: [24,24],
				iconAnchor: [12,12],
				labelAnchor: [0,0]
			},
			large: {
				className: 'svgIcon',
				iconSize: [32,32],
				iconAnchor: [16,16],
				labelAnchor: [0,0]
			}
		},
		labels: {
			default: {
				noHide:true,
				offset: [0, 0]
			}
		}
	};

	this.factions = ['ns','nc','tr','vs'];

	this.facilityTypes = {
		ampStation: {
			name: "Amp Station",
			id: 2
		},
		bioLab: {
			name: "Bio Lab",
			id: 3
		},
		techPlant: {
			name: "Tech Plant",
			id: 4
		},
		warpgate: {
			name: "Warpgate",
			id: 7
		},
		interlinkFacility: {
			name: "Interlink Facility",
			id: 8
		},
		largeOutpost: {
			name: "Large Outpost",
			id: 5
		},
		smallOutpost: {
			name: "Small Outpost",
			id: 6
		}
	};

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

// Extend jQuery addClass, removeClass and hasClass for SVG elements
(function($){

  /* addClass shim
   ****************************************************/
  var addClass = $.fn.addClass;
  $.fn.addClass = function(value) {
    var orig = addClass.apply(this, arguments);

    var elem,
      i = 0,
      len = this.length;

    for (; i < len; i++ ) {
      elem = this[ i ];
      if ( elem instanceof SVGElement ) {
        var classes = $(elem).attr('class');
        if ( classes ) {
            var index = classes.indexOf(value);
            if (index === -1) {
              classes = classes + " " + value;
              $(elem).attr('class', classes);
            }
        } else {
          $(elem).attr('class', value);
        }
      }
    }
    return orig;
  };

  /* removeClass shim
   ****************************************************/
  var removeClass = $.fn.removeClass;
  $.fn.removeClass = function(value) {
    var orig = removeClass.apply(this, arguments);

    var elem,
      i = 0,
      len = this.length;

    for (; i < len; i++ ) {
      elem = this[ i ];
      if ( elem instanceof SVGElement ) {
        var classes = $(elem).attr('class');
        if ( classes ) {
          var index = classes.indexOf(value);
          if (index !== -1) {
            classes = classes.substring(0, index) + classes.substring((index + value.length), classes.length);
            $(elem).attr('class', classes);
          }
        }
      }
    }
    return orig;
  };

  /* hasClass shim
   ****************************************************/
  var hasClass = $.fn.hasClass;
  $.fn.hasClass = function(value) {
    var orig = hasClass.apply(this, arguments);

    var elem,
      i = 0,
      len = this.length;

    for (; i < len; i++ ) {
      elem = this[ i ];
      if ( elem instanceof SVGElement ) {
        var classes = $(elem).attr('class');

        if ( classes ) {
          if ( classes.indexOf(value) === -1 ) {
            return false;
          } else {
            return true;
          }
        } else {
            return false;
        }
      }
    }
    return orig;
  };
})(jQuery);

(function(){

	// Custom Projection
	L.Projection.LatLon = {
		project: function (latlng) {
			return new L.Point(latlng.lat, latlng.lng);
		},
		unproject: function (point) {
			return new L.LatLng(point.x, point.y);
		},
		bounds: L.bounds([0,0],[256,256])
	};

	// Custom CRS
	L.CRS.Screen = L.extend({}, L.CRS, {
		projection: L.Projection.LatLon,
		transformation: new L.Transformation(1, 0, 1, 0),
		scale: function (zoom) {
			return Math.pow(2, zoom);
		},
		wrapLat: null,
		wrapLng: null
	});

	// Map Creation
	ps2maps.map = L.map('map',
	{
		crs: L.CRS.Screen,
		minZoom: 1,
		maxZoom: 7,
		attributionControl: false,
	})
	// Prevent Right-click context menu
	// .on('contextmenu', function(e){});

	// Tile Layer
	var tilesUrl = tilesCdn + "/tiles/" + continent.slug + tileVersion + "/zoom{z}/tile_{z}_{x}_{y}.jpg";
	L.tileLayer(tilesUrl, {
		subdomains: '0123',
		noWrap: true,
		continuousWorld: true
	}).addTo(ps2maps.map);

	/* Canvas Tiles (for debugging)
	var canvasTiles = L.tileLayer.canvas({
	    minZoom: 0,
	    maxZoom: 16,
	    attribution: 'Map data &copy; FooBar',
	    continuousWorld: true,
	    tms: true
	});
	canvasTiles.drawTile = function(canvas, point, zoom) {
	    var context = canvas.getContext('2d');
	    context.beginPath();
	    context.rect(0, 0, 256, 256);
	    context.lineWidth = 2;
	    context.strokeStyle = 'white';
	    context.stroke();
	    context.font="20px Arial";
	    context.fillStyle = 'white';
	    context.fillText("x:" + point.x + " y:" + point.y + " z:" + zoom, 80, 140);
	}
	canvasTiles.addTo(ps2maps.map);
	*/

	// Set view to either default view or use url hash
	var lat, lng, zoom, view = window.location.hash.slice(1,-1).split(',');
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
	var mapMoveZoom = function(e)
	{
		var center = this.map.getCenter();
		history.replaceState(null, null, continent.slug+'#'+center.lat+','+center.lng+','+this.map.getZoom()+'z');
	};
	ps2maps.map.on('moveend', mapMoveZoom.bind(ps2maps));

	// var mapZoom = function(e)
	// {
	// 	console.log(e);
	// };
	// ps2maps.map.on('zoomend', mapZoom.bind(ps2maps)).fireEvent('zoomend');
})();

// Create Regions
(function(){

	var regionClick = function(e)
	{

	};

	var regionMouseOver = function(e)
	{
		e.target.bringToFront().setStyle(ps2maps.options.regions.hover);
	};

	var regionMouseOut = function(e)
	{
		e.target.setStyle(ps2maps.options.regions.default);
	};

	ps2maps.regions = {};
	var regions = [], region;

	for( id in continent.regions )
	{
		region = L.polygon( continent.regions[id].points, ps2maps.options.regions.default )
			.on('click', regionClick)
			.on('mouseover', regionMouseOver)
			.on('mouseout', regionMouseOut);
		region.id = id;
		region.name = continent.regions[id].name;
		region.facility = null;
		region.addTo(ps2maps.map);
		ps2maps.regions[id] = region;
	}
})();

(function(){

ps2maps.icons = {
	facilities: {}
};

// Facility and Outpost Icons
var options;
for( type in ps2maps.facilityTypes ) {

	// Facilities get larger icons
	switch(type){
		case 'ampStation':
		case 'bioLab':
		case 'interlinkFacility':
		case 'techPlant':
		case 'warpgate':
			options = ps2maps.options.icons.large;
			break;
		default:
			options = ps2maps.options.icons.default;
	}
	ps2maps.icons.facilities[type] = {};
	for( f in ps2maps.factions ) {
		options.html = "<svg viewBox='0 0 256 256' class='marker-icon " + type + " " + ps2maps.factions[f] + "'><use xlink:href='#" + type + "'></use></svg>";
		ps2maps.icons.facilities[type][ps2maps.factions[f]] = L.divIcon(options);
	}
}

// ps2maps.icons = {
// 	ampStation: L.divIcon({
// 		className: 'svgIcon',
// 		iconSize: [32,32],
// 		iconAnchor: [16,16],
// 		html: "<svg viewBox='0 0 256 256' class='icon ampStation'><use xlink:href='#ampStation'></use></svg>"
// 	}),
// 	bioLab: L.divIcon({
// 		className: 'svgIcon',
// 		iconSize: [32,32],
// 		iconAnchor: [16,16],
// 		html: "<svg viewBox='0 0 256 256' class='icon biolab'><use xlink:href='#bioLab'></use></svg>"
// 	}),
// 	techPlant:  L.divIcon({
// 		className: 'svgIcon',
// 		iconSize: [32,32],
// 		iconAnchor: [16,16],
// 		html: "<svg viewBox='0 0 256 256' class='icon techPlant'><use xlink:href='#techPlant'></use></svg>"
// 	})
// };

})();

// Marker Icons
var oldIcon = {
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

	ps2maps.facilities = {};

	var	options = {},
		labelOptions,
		marker;

	labelOptions = ps2maps.options.labels.default;
	for( type in continent.markers.facilities ) {
		options = {
			icon: ps2maps.icons.facilities[type].ns,
		};
		switch(type){
			case 'ampStation':
			case 'bioLab':
			case 'interlinkFacility':
			case 'techPlant':
			case 'warpgate':
				options.pane = 'facilitiesPane';
				labelOptions.pane = 'facilitiesLabelsPane';
				break;
			default:
				options.pane = 'outpostsPane';
				labelOptions.pane = 'outpostsLabelsPane';
		}
		for( id in continent.markers.facilities[type] ) {
			facility = continent.markers.facilities[type][id];
			marker = L.marker(facility.xy, options)
				.bindLabel(facility.name, ps2maps.options.labels.default)
				.addTo(ps2maps.map);
			marker.id = id;
			marker.region = null;
			marker.latticeLinks = [];
			marker.facilities = [];
			ps2maps.facilities[id] = marker;
		}

	}
})();

// Create Lattice Links
(function(){

	// Lattice object
	var latticeLink = function(facilityA, facilityB)
	{
		this._facilityA = facilityA;
		this._facilityB = facilityB;
		this.facilities = [];
		this.facilities[facilityA.id] = facilityA;
		this.facilities[facilityB.id] = facilityB;

		this._styles = {
			ns: {
				line: {
					color: '#79e0e1',
					weight: 4,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					weight: 6,
					clickable: false
				}
			},
			nc: {
				line: {
					color: '#33ADFF',
					weight: 5,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					weight: 7,
					clickable: false
				}
			},
			tr: {
				line: {
					color: '#DF2020',
					weight: 5,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					weight: 7,
					clickable: false
				}
			},
			vs: {
				line: {
					color: '#9E52E0',
					weight: 5,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					weight: 7,
					clickable: false
				}
			},
			contested: {
				line: {
					color: '#FFFF00',
					weight: 5,
					clickable: false,
					dashArray: [1,6]
				},
				outline: {
					color: '#000',
					weight: 6,
					clickable: false
				}
			}
		};

		// Draw the line and outline
		var points = [this._facilityA.getLatLng(), this._facilityB.getLatLng()];
		this._outline = L.polyline(points, this._styles.ns.outline).addTo(ps2maps.map);
		this._line = L.polyline(points, this._styles.ns.line).addTo(ps2maps.map);

		this.setFaction = function(faction)
		{
			this._outline.setStyle(this._styles[faction].outline);
			this._line.setStyle(this._styles[faction].line);
		};
	}

	var points,
		lattice;
	ps2maps.lattice = [];
	// Iterate through the facilities
	for( type in continent.markers.facilities ) {
		for( id in continent.markers.facilities[type] ) {
			// Create lattice links for all linked facilities
			if ( continent.markers.facilities[type][id].links ) {
				for( index in continent.markers.facilities[type][id].links ) {
					ps2maps.lattice.push(new latticeLink(ps2maps.facilities[id], ps2maps.facilities[continent.markers.facilities[type][id].links[index]]));
				}
			}
		}
	}

})();

// Associate Regions, Facilities and Lattice Links
(function(){

	// Associate regions and facilities
	for( region_id in continent.regions ) {
		if ( ps2maps.facilities[continent.regions[region_id].facility_id] ) {
			ps2maps.regions[region_id].facility = ps2maps.facilities[continent.regions[region_id].facility_id];
			ps2maps.facilities[continent.regions[region_id].facility_id].region = ps2maps.regions[region_id];
		}
	}

	// Associate facilities with lattice links
	for( index in ps2maps.lattice ) {
		for( facility_index in ps2maps.lattice[index].facilities) {
			ps2maps.lattice[index].facilities[facility_index].latticeLinks.push(ps2maps.lattice[index]);

		}
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

$(function(){
	// Load svg sprites svg inline into document
	$('#svg-sprites-container').load('/img/icons/sprites.svg');
});
