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
