(function(){

if ( "WebSocket" in window ) {
	var socketUrl = "wss://push.planetside2.com/streaming?service-id=s:ps2maps";
	ps2maps.sockets.facilityControl = new ReconnectingWebSocket(socketUrl);
	ps2maps.sockets.facilityControl.debug = true;

	ps2maps.sockets.facilityControl.onopen = function()
	{
		// Fetch current facility control statistics
		var url = "http://census.soe.com/s:ps2maps/get/ps2:v2/map/?world_id=" + server.id + "&zone_ids=" + continent.id + "&callback=?";
		$.getJSON(url)
			.done(function(data){

				// Set faction ownership of all facilties
				var faction, region;
				for ( var row in data.map_list[0].Regions.Row ) {

					// The faction
					faction = ps2maps.factions[data.map_list[0].Regions.Row[row].RowData.FactionId].slug;

					// The region id
					region_id = data.map_list[0].Regions.Row[row].RowData.RegionId;

					// ps2maps.regions[region_id].setFaction(faction);

					// If a facility exists, set it's faction
					if ( ps2maps.regions[region_id].facility ) {
						ps2maps.regions[region_id].facility.setFaction(faction);
					} else { // Otherwise, just set the region's faction
						ps2maps.regions[region_id].setFaction(faction);
					}
				}

				// Find each factions warpgates
				ps2maps.warpgates = {};
				for( id in continent.markers.facilities.warpgate ) {
					ps2maps.warpgates[ps2maps.facilities[id].faction] = ps2maps.facilities[id];
				}

				// Set lattice colors
				for( var index in ps2maps.lattice ) {
					ps2maps.lattice[index].setFaction();
				}

				// Calculate Linked Facilities
				ps2maps.findAllLinkedFacilities();

				// Set region colors
				for( var facility_id in ps2maps.facilities ) {
					if ( ps2maps.facilities[facility_id].region ) {
						ps2maps.facilities[facility_id].region.setFaction();
					}
				}

				ps2maps.logText("Facility & Region Ownership data loaded");

				// Subscribe to facility control changes via websocket service
				var subscription = '{"service":"event","action":"subscribe","worlds":["' + server.id + '"],"eventNames":["FacilityControl"]}';
				ps2maps.sockets.facilityControl.send(subscription);

			})
			// Cannot connect to Census API
			.fail(function(){
				alert('Error connecting to SOE Census API');
			});
	};

	ps2maps.sockets.facilityControl.onmessage = function(message)
	{
		// Receive Faction Control messages
		var data = JSON.parse(message.data);
		if ( data.payload ) {
			// For this continent only
			if ( data.payload.zone_id == continent.id ) {

				var faction = ps2maps.factions[data.payload.new_faction_id].slug;
				var facility_id = data.payload.facility_id;

				if ( ps2maps.facilities[facility_id] !== undefined ) {

					// Log facility control event
					ps2maps.logFacilityControl(facility_id, data.payload.old_faction_id, data.payload.new_faction_id, data.payload.timestamp);

					// If recapture, don't change color of the region
					if ( data.payload.old_faction_id == data.payload.new_faction_id ) {
						return true;
					}

					// Set the facility faction
					ps2maps.facilities[facility_id].setFaction(faction);

					// Set the lattice colors
					for ( var lattice_id in ps2maps.facilities[facility_id].lattice ) {
						ps2maps.facilities[facility_id].lattice[lattice_id].setFaction();
					}

					// Calculate Linked Facilities
					ps2maps.findAllLinkedFacilities();

					// Set the region color
					ps2maps.facilities[facility_id].region.setFaction(null, true);
				}
			}
		}
	};
} else {
	console.log("Web sockets are not supported on your browser");
}

})();


