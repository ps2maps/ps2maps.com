// Create Markers
(function(){

	ps2maps.facilities = {};

	var	options = {},
		marker,
		labelOptions = {
			noHide:true,
			offset: [0, 0]
		};



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
			if ( facility.xy ) {
				marker = L.marker(facility.xy, options)
					.bindLabel(facility.name, labelOptions)
					.addTo(ps2maps.map);
			} else {
				marker = {};
			}
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
				if ( !this.setIcon )
					return false;

				switch(faction) {
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
