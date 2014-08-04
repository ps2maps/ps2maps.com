(function(){

ps2maps.icons = {
	facilities: {}
};

iconOptions = {
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
			options = iconOptions.large;
			break;
		default:
			options = iconOptions.default;
	}
	ps2maps.icons.facilities[type] = {};
	for( var id in ps2maps.factions ) {
		options.html = "<svg viewBox='0 0 256 256' class='marker-icon " + type + " " + ps2maps.factions[id].slug + "'><use xlink:href='#" + type + "'></use></svg>";
		ps2maps.icons.facilities[type][ps2maps.factions[id].slug] = L.divIcon(options);
	}
}

})();
