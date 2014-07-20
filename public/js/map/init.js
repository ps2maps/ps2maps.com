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
