// Ps2maps Class
function Ps2maps()
{
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
