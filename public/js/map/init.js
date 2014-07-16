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
				weight: 2
			}
		},
		icons: {
			default: {
				className: 'svgIcon',
				iconSize: [32,32],
				iconAnchor: [16,16],
				labelAnchor: [0,0]
			},
			large: {
				className: 'svgIcon',
				iconSize: [40,40],
				iconAnchor: [20,20],
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

	this.icons = {
		facilities: {},
		outposts: {}
	}

	this.factions = ['ns','nc','tr','vs'];

	this.facilityTypes = {
		facilities: {
			2: {
				name: "Amp Station",
				slug: "ampStation",
			},
			3: {
				name: "Bio Lab",
				slug: "bioLab",
			},
			4: {
				name: "Tech Plant",
				slug: "techPlant",
			},
			7: {
				name: "Warpgate",
				slug: "warpgate",
			},
			8: {
				name: "Interlink Facility",
				slug: "interlinkFacility"
			}
		},
		outposts: {
			5: {
				name: "Large Outpost",
				slug: "largeOutpost"
			},
			6: {
				name: "Small Outpost",
				slug: "smallOutpost"
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
	e.target.bringToFront().setStyle(ps2maps.options.regions.hover);
};

// Region Mouse Out Handler
Ps2maps.prototype.regionMouseOut = function(e)
{
	e.target.setStyle(ps2maps.options.regions.default);
};

// Map Move/Zoom Handler
Ps2maps.prototype.mapMoveZoom = function(e)
{
	var center = this.map.getCenter();
	history.replaceState(null, null, continent.slug+'#'+center.lat+','+center.lng+','+this.map.getZoom()+'z');
};

var ps2maps = new Ps2maps();
