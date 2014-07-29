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
