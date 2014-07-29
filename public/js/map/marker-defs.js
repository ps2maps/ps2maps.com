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
