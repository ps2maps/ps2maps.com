// Ps2maps Class
function Ps2maps()
{
	this.sockets = {};
	this.defaultView = {
		lat: 128,
		lng: 128,
		zoom: 2
	};

	this.options = {
		regions: {
			hover: {
				color: '#EEE',
				weight: 3
			},
			ns:  {
				weight: 1.2,
				color: '#000',
				opacity: 1,
				fillOpacity: 0,
				pane: 'regionsPane'
			},
			nc: {
				weight: 1.2,
				fillColor: 'hsl(204,100%,60%)',
				fillOpacity: 0.4,
				color: '#000'
			},
			nc_dark: {
				weight: 1.2,
				fillColor: 'hsl(204,100%,30%)',
				fillOpacity: 0.7,
				color: '#000'
			},
			tr: {
				weight: 1.2,
				fillColor: 'hsl(0,75%,50%)',
				fillOpacity: 0.4,
				color: '#000'
			},
			tr_dark: {
				weight: 1.2,
				fillColor: 'hsl(0,75%,27%)',
				fillOpacity: 0.8,
				color: '#000'
			},
			vs: {
				weight: 1.2,
				fillColor: 'hsl(272,70%,60%)',
				fillOpacity: 0.4,
				color: '#000'
			},
			vs_dark: {
				weight: 1.2,
				fillColor: 'hsl(272,70%,30%)',
				fillOpacity: 0.7,
				color: '#000'
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

	this.factions = {
		0: {
			slug: 'ns',
			name: 'Nanite Systems'
		},
		1: {
			slug: 'vs',
			name: 'Vanu Soverignty'
		},
		3: {
			slug: 'tr',
			name: 'Terran Republic'
		},
		2: {
			slug: 'nc',
			name: 'New Conglomerate'
		}
	};

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

	this.linkedFacilities = {nc:[], tr:[], vs:[]};
	this.findAllLinkedFacilities = function()
	{
		this.linkedFacilities = {nc:[], tr:[], vs:[]};
		for( var index in this.warpgates ) {
			this.calculateLinkedFacilities(this.warpgates[index]);
		}
	}
	this.calculateLinkedFacilities = function(facility)
	{
		var faction = facility.faction;
		this.linkedFacilities[faction][facility.id] = facility;
		for( index in facility.facilities ) {
			if ( facility.facilities[index].faction == faction && !(facility.facilities[index].id in this.linkedFacilities[faction]) ) {
				this.calculateLinkedFacilities(facility.facilities[index]);
			}
		}
	}

};

var ps2maps = new Ps2maps();

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

	// Show/hide panes at zoom levels
	var mapZoom = function(e)
	{
		var zoom = e.target._zoom;
		var map = ps2maps.map;

		// Hide outposts at zoom level 1
		if ( zoom <= 1 ) {
			map.getPane('outpostsLabelsPane').style.opacity = 0;
			map.getPane('outpostsPane').style.opacity = 0;
		} else {
			map.getPane('outpostsLabelsPane').style.opacity = 1;
			map.getPane('outpostsPane').style.opacity = 1;
		}

		if ( zoom <= 4 ) {
			map.getPane('latticePane').style.opacity = 0.8;
		} else if ( zoom == 5 ) {
			map.getPane('latticePane').style.opacity = 0.6;
		} else if ( zoom == 6 ) {
			map.getPane('latticePane').style.opacity = 0.4;
		} else if ( zoom >= 7) {
			map.getPane('latticePane').style.opacity = 0.2;
		}

	};
	ps2maps.map.on('zoomend', mapZoom.bind(ps2maps)).fireEvent('zoomend');

	// Function to set map view on the center of a facility
	ps2maps.viewFacility = function(facility_id)
	{
		this.map.setView(ps2maps.facilities[facility_id].getLatLng(), 5);
	}
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
		e.target.setStyle(ps2maps.options.regions[e.target.style]);
	};

	ps2maps.regions = {};
	var regions = [], region;

	for( var id in continent.regions )
	{
		region = L.polygon( continent.regions[id].points, ps2maps.options.regions.ns )
			.on('click', regionClick)
			.on('mouseover', regionMouseOver)
			.on('mouseout', regionMouseOut);
		region.id = id;
		region.faction = 'ns';
		region.facility = null;
		region.style = null;

		// Set the region's name
		var facility_id = continent.regions[id].facility_id;
		if ( continent.markers.facilities[facility_id] ) {
			region.name = continent.markers.facilities[continent.regions[id].facility_id].name;
		}

		region.setFaction = function(faction, animate)
		{
			if ( faction == null && this.facility ) {
				this.faction = this.facility.faction;

				if ( this.facility.isConnected() ) {
					this.style = this.faction;
				} else {
					this.style = this.faction + "_dark";
				}

			} else {
				this.faction = this.style = faction;
			}

			if ( animate == true ) {
				d3.select(this._path)
					.transition().duration(500).attr({fill: '#FFFFFF', 'fill-opacity': 1})
					.transition().duration(1000).attr({fill: ps2maps.options.regions[this.style].fillColor, 'fill-opacity': ps2maps.options.regions[this.style].fillOpacity});
			} else {
				this.setStyle(ps2maps.options.regions[this.style]);
			}
		}

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
for( var type in ps2maps.facilityTypes ) {

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
	for( var id in ps2maps.factions ) {
		options.html = "<svg viewBox='0 0 256 256' class='marker-icon " + type + " " + ps2maps.factions[id].slug + "'><use xlink:href='#" + type + "'></use></svg>";
		ps2maps.icons.facilities[type][ps2maps.factions[id].slug] = L.divIcon(options);
	}
}

})();

// Create Markers
(function(){

	ps2maps.facilities = {};

	var	options = {},
		labelOptions,
		marker;

	labelOptions = ps2maps.options.labels.default;
	for( var type in continent.markers.facilities ) {
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
		for( var id in continent.markers.facilities[type] ) {
			facility = continent.markers.facilities[type][id];
			marker = L.marker(facility.xy, options)
				.bindLabel(facility.name, ps2maps.options.labels.default)
				.addTo(ps2maps.map);
			marker.id = id;
			marker.faction = 'ns';
			marker.name = facility.name;
			marker.facilityType = type;
			marker.region = null;
			marker.lattice = [];
			marker.facilities = [];

			marker.isConnected = function()
			{
				return (this.id in ps2maps.linkedFacilities[this.faction]);
			}

			marker.setFaction = function(faction)
			{
				this.faction = faction;
				switch(faction){
					case 'nc':
					case 'tr':
					case 'vs':
						this.setIcon(ps2maps.icons.facilities[this.facilityType][faction]);
						break;
					default:
						this.setIcon(ps2maps.icons.facilities[this.facilityType].ns);
				}
			}

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
		this.faction = 'ns';

		var options = {
			pane: 'latticePane'
		};

		this._options = {
			ns: {
				line: {
					color: '#79e0e1',
					pane: 'latticePane',
					weight: 2,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					pane: 'latticePane',
					weight: 4,
					clickable: false
				}
			},
			nc: {
				line: {
					color: factionColors.nc,
					pane: 'latticePane',
					weight: 2,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					pane: 'latticePane',
					weight: 4,
					clickable: false
				}
			},
			tr: {
				line: {
					color: factionColors.tr,
					pane: 'latticePane',
					weight: 2,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					pane: 'latticePane',
					weight: 4,
					clickable: false
				}
			},
			vs: {
				line: {
					color: factionColors.vs,
					pane: 'latticePane',
					weight: 2,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					pane: 'latticePane',
					weight: 4,
					clickable: false
				}
			},
			contested: {
				line: {
					color: '#FFFF00',
					pane: 'latticePane',
					weight: 3,
					clickable: false,
					dashArray: [3,6]
				},
				outline: {
					color: '#000',
					pane: 'latticePane',
					weight: 5,
					clickable: false
				}
			}
		};

		// Draw the line and outline
		var points = [this._facilityA.getLatLng(), this._facilityB.getLatLng()];
		this._outline = L.polyline(points, this._options.ns.outline).addTo(ps2maps.map);
		this._line = L.polyline(points, this._options.ns.line).addTo(ps2maps.map);

		this.setFaction = function()
		{
			var faction;
			if ( this._facilityA.faction == this._facilityB.faction ) {
				this.faction = this._facilityA.faction;
			} else {
				this.faction = 'contested';
			}
			this._outline.setStyle(this._options[this.faction].outline);
			this._line.setStyle(this._options[this.faction].line);
		};
	}

	var points,
		lattice;
	ps2maps.lattice = [];
	// Iterate through the facilities
	for( var type in continent.markers.facilities ) {
		for( var id in continent.markers.facilities[type] ) {
			// Create lattice links for all linked facilities
			if ( continent.markers.facilities[type][id].links ) {
				for( var index in continent.markers.facilities[type][id].links ) {
					ps2maps.lattice.push(new latticeLink(ps2maps.facilities[id], ps2maps.facilities[continent.markers.facilities[type][id].links[index]]));
				}
			}
		}
	}

})();

// Associate Regions, Facilities and Lattice Links
(function(){

// Associate regions and facilities
for( var region_id in continent.regions ) {
	if ( ps2maps.facilities[continent.regions[region_id].facility_id] ) {
		ps2maps.regions[region_id].facility = ps2maps.facilities[continent.regions[region_id].facility_id];
		ps2maps.facilities[continent.regions[region_id].facility_id].region = ps2maps.regions[region_id];
	}
}

for( var index in ps2maps.lattice ) {
	// Iterate through facilities on each lattice link
	for( var facility_id in ps2maps.lattice[index].facilities) {

		// Associate facilities with lattice links
		ps2maps.facilities[facility_id].lattice.push(ps2maps.lattice[index]);

		// Associate facilities with other linked facilities
		for( var linked_facility_id in ps2maps.lattice[index].facilities ) {
			if ( facility_id != linked_facility_id ) {
				ps2maps.facilities[facility_id].facilities.push(ps2maps.facilities[linked_facility_id]);
			}
		}
	}
}

})();


(function(){

if ( "WebSocket" in window ) {
	var socketUrl = "wss://push.planetside2.com/streaming?service-id=s:ps2maps";
	ps2maps.sockets.facilityControl = new ReconnectingWebSocket(socketUrl);
	ps2maps.sockets.facilityControl.debug = true;

	ps2maps.sockets.facilityControl.onopen = function()
	{
		// Fetch current facility control statistics
		var url = "http://census.soe.com/s:ps2maps/get/ps2:v2/map/?world_id=" + server.id + "&zone_ids=" + continent.id + "&callback=?";
		$.getJSON(url)
			.done(function(data){

				// Set faction ownership of all facilties
				var faction, region;
				for ( var row in data.map_list[0].Regions.Row ) {

					// The faction
					faction = ps2maps.factions[data.map_list[0].Regions.Row[row].RowData.FactionId].slug;

					// The region id
					region_id = data.map_list[0].Regions.Row[row].RowData.RegionId;

					// ps2maps.regions[region_id].setFaction(faction);

					// If a facility exists, set it's faction
					if ( ps2maps.regions[region_id].facility ) {
						ps2maps.regions[region_id].facility.setFaction(faction);
					} else { // Otherwise, just set the region's faction
						ps2maps.regions[region_id].setFaction(faction);
					}
				}

				// Find each factions warpgates
				ps2maps.warpgates = {};
				for( id in continent.markers.facilities.warpgate ) {
					ps2maps.warpgates[ps2maps.facilities[id].faction] = ps2maps.facilities[id];
				}

				// Set lattice colors
				for( var index in ps2maps.lattice ) {
					ps2maps.lattice[index].setFaction();
				}

				// Calculate Linked Facilities
				ps2maps.findAllLinkedFacilities();

				// Set region colors
				for( var facility_id in ps2maps.facilities ) {
					if ( ps2maps.facilities[facility_id].region ) {
						ps2maps.facilities[facility_id].region.setFaction();
					}
				}

				ps2maps.logText("Facility & Region Ownership data loaded");

				// Subscribe to facility control changes via websocket service
				var subscription = '{"service":"event","action":"subscribe","worlds":["' + server.id + '"],"eventNames":["FacilityControl"]}';
				ps2maps.sockets.facilityControl.send(subscription);

			})
			// Cannot connect to Census API
			.fail(function(){
				alert('Error connecting to SOE Census API');
			});
	};

	ps2maps.sockets.facilityControl.onmessage = function(message)
	{
		// Receive Faction Control messages
		var data = JSON.parse(message.data);
		if ( data.payload ) {
			// For this continent only
			if ( data.payload.zone_id == continent.id ) {

				var faction = ps2maps.factions[data.payload.new_faction_id].slug;
				var facility_id = data.payload.facility_id;

				if ( ps2maps.facilities[facility_id] !== undefined ) {

					// Log facility control event
					ps2maps.logFacilityControl(facility_id, data.payload.old_faction_id, data.payload.new_faction_id, data.payload.timestamp);

					// If recapture, don't change color of the region
					if ( data.payload.old_faction_id == data.payload.new_faction_id ) {
						return true;
					}

					// Set the facility faction
					ps2maps.facilities[facility_id].setFaction(faction);

					// Set the lattice colors
					for ( var lattice_id in ps2maps.facilities[facility_id].lattice ) {
						ps2maps.facilities[facility_id].lattice[lattice_id].setFaction();
					}

					// Calculate Linked Facilities
					ps2maps.findAllLinkedFacilities();

					// Set the region color
					ps2maps.facilities[facility_id].region.setFaction(null, true);
				}
			}
		}
	};
} else {
	console.log("Web sockets are not supported on your browser");
}

})();



(function(){
	// Initialize Log Window
	var logWindow = $('.log-body');
	// Set height from localStorage or default value
	var height = cache.getItem('ps2maps.log.height');
	if ( !height || height < 0 )
		height = '30%';
	logWindow.css('height', height);

	// Resize Handle
	$('.log-header').on('mousedown', function(e){
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

	ps2maps.logText = function(message)
	{
		var list = $('.log-list ul');
		var time = moment().format(timeFormat);
		console.log('test');
		var html = "<li class='misc'><div class='col-xs-12'><span class='timestamp'>" + time + "</span> " + message + "</div></li>";
		if ( $('#filter-misc').is(':checked') ) {
			$(html).hide().css('opacity',0).prependTo(list).slideDown('slow').animate({opacity: 1.0});
		} else {
			$(html).hide().prependTo(list);
		}
	}

	ps2maps.logFacilityControl = function(facility_id, old_faction_id, new_faction_id, timestamp)
	{
		// Delete old values off end of list
		// var max = 50;
		// var children = list.children();
		// for ( var c = children.length-1; c >= max-1; c-- ) {
		// 	children[c].fadeOut().remove();
		// }

		// Add new list item
		var list = $('.log-list ul');
		var faction = ps2maps.factions[new_faction_id];
		var facility = ps2maps.facilities[facility_id];

		// Determine the local capture time
		var time = moment.unix(timestamp).format(timeFormat);

		// Resecured or Captured?
		var verb = old_faction_id == new_faction_id ? "resecured" : "captured";

		// The facility icon
		var icon = "<div class='facility-icon'><svg viewBox='0 0 256 256' class='marker-icon " + facility.facilityType + " " + faction.slug + "'><use xlink:href='#" + facility.facilityType + "'></use></svg></div>";

		// The HTML
		var html = "<li class='" + faction.slug + " " + verb + "'><div class='col-xs-12'><span class='timestamp'>" + time + "</span> " + icon + " <a class='" + faction.slug + "' href='javascript:ps2maps.viewFacility("+ facility_id + ");'>" + facility.name +"</a> - ";
		html += verb + " by the <span class='" + faction.slug + "'>" + faction.name +"</span></div></li>";

		// Hide or show log item depending on current filters
		if ( $('#filter-' + faction.slug).is(':checked') && $('#filter-' + verb).is(':checked') ) {
			$(html).hide().css('opacity',0).prependTo(list).slideDown('slow').animate({opacity: 1.0});
		} else {
			$(html).hide().prependTo(list);
		}
	}

	$(function(){
		// Set Filter checkbox values
		$('.filter-checkbox').each(function(){
			$(this).prop('checked', cache.getItem('ps2maps.log.filter.' + $(this).data('filter'), true));
		});

		// Filter checkbox handling
		ps2maps.logList = $('.log-list ul');
		$('.filter-checkbox').on('click', function(){
			var type = $(this).data('filter');
			var checked = $(this).is(':checked');
			if ( checked ) {
				ps2maps.logList.find('.'+type).fadeIn();
			} else {
				ps2maps.logList.find('.'+type).fadeOut();
			}
			cache.setItem('ps2maps.log.filter.' + type, checked);
		});
	});

})();

$(function(){
	// Load svg sprites svg inline into document
	$('#svg-sprites-container').load('/img/icons/sprites.svg');
});
