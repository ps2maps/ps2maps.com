// Ps2maps Class
function Ps2maps()
{
	this.defaultView = {
		lat: 128,
		lng: 128,
		zoom: 2
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

	this.pageVisibilityChange = function()
	{
		if ( pageIsVisible() ) {
			console.log('its back');
		}
	}

};

var ps2maps = new Ps2maps();
