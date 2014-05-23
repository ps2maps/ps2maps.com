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
tileUrl = "http://images.ps2maps.com/tiles20130720/" + continent.slug + "/zoom{z}/tile_{z}_{x}_{y}.jpg";
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
var layers = null;

// Marker Icons
var icons = {
	neutral: {
		ampStation: L.divIcon({
			className: 'icon amp-station',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		bioLab: L.divIcon({
			className: 'icon bio-lab',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		techPlant: L.divIcon({
			className: 'icon tech-plant',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		largeOutpost: L.divIcon({
			className: 'icon large-outpost',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		smallOutpost: L.divIcon({
			className: 'icon small-outpost',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		forwardSpawnLabeled: L.divIcon({
			className: 'icon forward-spawn',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		forwardSpawn: L.divIcon({
			className: 'icon forward-spawn',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		warpgate: L.divIcon({
			className: 'icon warpgate',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		aircraftTerminal: L.divIcon({
			className: 'icon aircraft-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		galaxyTerminal: L.divIcon({
			className: 'icon galaxy-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		groundVehicleTerminal: L.divIcon({
			className: 'icon ground-vehicle-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		groundTransportTerminal: L.divIcon({
			className: 'icon ground-transport-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		equipmentTerminal: L.divIcon({
			className: 'icon equipment-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		warpgateTerminal: L.divIcon({
			className: 'icon warpgate-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		verticalShieldGenerator: L.divIcon({
			className: 'icon vertical-shield-generator',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		horizontalShieldGenerator: L.divIcon({
			className: 'icon horizontal-shield-generator',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		gateShieldGenerator: L.divIcon({
			className: 'icon gate-shield-generator',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		spawnControlUnitShieldGenerator: L.divIcon({
			className: 'icon scu-shield-generator',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		spawnBeacon: L.divIcon({
			className: 'icon spawn-beacon',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		spawnControlUnit: L.divIcon({
			className: 'icon spawn-control-unit',
			iconSize: [64,32],
			iconAnchor: [32,16]
		}),
		teleporter: L.divIcon({
			className: 'icon teleporter',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		spawnTube: L.divIcon({
			className: 'icon spawn-tube',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		ammoTower: L.divIcon({
			className: 'icon ammo-tower',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		landingPad: L.divIcon({
			className: 'icon landing-pad',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		capturePoint: L.divIcon({
			className: 'icon capture-point',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	}
};

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
			fillColor: '#9900FF',
			fillOpacity: 0.5,
			color: '#333',
			opacity: 1
		},
		hoverStyle: {
			fillColor: '#6600CC',
			fillOpacity: 0.5
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
			fillColor: '#0066FF',
			fillOpacity: 0.5,
			color: '#333',
			opacity: 1
		},
		hoverStyle: {
			fillColor: '#0033FF',
			fillOpacity: 0.5
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
			fillColor: '#FF0000',
			fillOpacity: 0.5,
			color: '#333',
			opacity: 1
		},
		hoverStyle: {
			fillColor: '#AA0000',
			fillOpacity: 0.5
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
			fillColor: '#1BC263',
			fillOpacity: 0.5,
			color: '#333'
		},
		hoverStyle: {
			fillColor: '#1BC263',
			fillOpacity: 0.7
		}
	},
	3: { // Mechanized
		name: 'Mechanized',
		className: 'mechanized',
		defaultStyle: {
			fillColor: '#CC881B',
			fillOpacity: 0.5,
			color: '#333'
		},
		hoverStyle: {
			fillColor: '#CC881B',
			fillOpacity: 0.7
		}
	},
	4: { // Infantry
		name: 'Infantry',
		className: 'infantry',
		defaultStyle: {
			fillColor: '#F2EF22',
			fillOpacity: 0.5,
			color: '#333'
		},
		hoverStyle: {
			fillColor: '#F2EF22',
			fillOpacity: 0.7
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

$(document).ready(function()
{

});
