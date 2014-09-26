(function(){

census = {
	facilityOwnership: {}
};

census.calculateFacilityOwnershipPercentage = function()
{
	// Tally up owned territories
	// Start at -1 because Warpgates don't count
	var territories = { vs: -1, tr: -1, nc: -1 };
	for( id in ps2maps.facilities ) {
		territories[ps2maps.facilities[id].faction] += 1;
	}

	// Calculate Total number of territories
	var total = territories.vs + territories.tr + territories.nc;

	// Convert values to percentages
	for( id in territories ) {
		territories[id] = Math.round(territories[id]/total*100);
		if ( territories[id] == -1 ) {
			territories[id] = 0;
		}	else if ( territories[id] > 100 ) {
			territories[id] = 100;
		}
	}

	// Update the territory control chart
	window.updateTerritoryChart([territories.vs, territories.tr, territories.nc]);
}

census.fetchFacilityOwnership = function(callback)
{
	var url = "http://census.soe.com/s:ps2maps/get/ps2:v2/map/?world_id=" + server.id + "&zone_ids=" + continentIds + "&callback=?";
	$.getJSON(url)
		.done(function(data)
		{
			if ( data.map_list && data.map_list.length > 0 ) {
				// Format facility ownership into key'ed object arrays
				for( continentIndex in data.map_list ) {
					var continent = data.map_list[continentIndex];
					census.facilityOwnership[continent.ZoneId] = [];
					for( regionIndex in continent.Regions.Row ) {
						var region = continent.Regions.Row[regionIndex].RowData;
						census.facilityOwnership[continent.ZoneId][region.RegionId] = region.FactionId;
					}
				}
				callback(true);
			} else {
				callback(false);
			}
		}).fail(function()
		{
			callback(false);
		});
};

census.updateMenu = function()
{
	for( continentId in census.facilityOwnership ) {
		var factionId = null;
		var locked = true;
		for( regionId in census.facilityOwnership[continentId] ) {
			if ( factionId == null ) {
				factionId = census.facilityOwnership[continentId][regionId];
				continue;
			}
			if ( census.facilityOwnership[continentId][regionId] != factionId ) {
				locked = false ;
				break;
			}
		}

		// Locked Continent
		if ( locked == true ) {
			$('nav li[data-id=' + continentId + ']')
				.removeClass('nc tr vs')
				.addClass('locked ' + ps2maps.factions[factionId].slug);
		} else {
			$('nav li[data-id=' + continentId + ']').removeClass('nc tr vs locked')
		}
	}
};

census.updateMap = function()
{
	// Set faction ownership of all facilties
	var faction, region;
	for ( regionId in census.facilityOwnership[continent.id] ) {

		// The faction
		faction = ps2maps.factions[census.facilityOwnership[continent.id][regionId]].slug;

		// Does region have a facility?
		if ( ps2maps.regions[regionId].facility ) {
			// Yes, set it's faction
			ps2maps.regions[regionId].facility.setFaction(faction);
		} else {
			// No, set the region's faction
			ps2maps.regions[regionId].setFaction(faction);
		}
	}

	// Find each factions warpgates
	ps2maps.warpgates = {};
	for( id in continent.markers.facilities.warpgate ) {
		if ( continent.markers.facilities.warpgate[id].xy ) {
			ps2maps.warpgates[ps2maps.facilities[id].faction] = ps2maps.facilities[id];
		}
	}

	// Set lattice colors
	for( var index in ps2maps.lattice ) {
		ps2maps.lattice[index].setFaction() ;
	}

	// Calculate Linked Facilities
	ps2maps.findAllLinkedFacilities();

	// Set region colors
	for( var id in ps2maps.facilities ) {
		if ( ps2maps.facilities[id].region ) {
			ps2maps.facilities[id].region.setFaction();
		}
	}

	// Update the bar chart
	census.calculateFacilityOwnershipPercentage();

	// Timestamp it
	census.facilityOwnership.lastTimestamp = moment();

	ps2maps.logText("Facility & Region Ownership data loaded");
}

census.setCurrentContinentOwner = function(faction_id)
{
	var faction = ps2maps.factions[faction_id].slug;

	// Set faction owner for all regions
	for( id in ps2maps.regions) {
		if ( ps2maps.regions[id].facility ) {
			ps2maps.regions[id].facility.setFaction(faction);
		} else {
			ps2maps.regions[id].setFaction(faction);
		}
	}

	// Find each factions warpgates
	ps2maps.warpgates = {};
	for( id in continent.markers.facilities.warpgate ) {
		if ( continent.markers.facilities.warpgate[id].xy ) {
			ps2maps.warpgates[ps2maps.facilities[id].faction] = ps2maps.facilities[id];
		}
	}

	// Set lattice colors
	for( var index in ps2maps.lattice ) {
		ps2maps.lattice[index].setFaction() ;
	}

	// Calculate Linked Facilities
	ps2maps.findAllLinkedFacilities();

	// Set region colors
	for( var id in ps2maps.facilities ) {
		if ( ps2maps.facilities[id].region ) {
			ps2maps.facilities[id].region.setFaction();
		}
	}

	// Update the bar chart
	census.calculateFacilityOwnershipPercentage();

	// Timestamp it
	census.facilityOwnership.lastTimestamp = moment();
}

census.websocketSubscribe = function()
{
	if ( Modernizr.websockets ) {
		census.createSocket = function()
		{
			// Create the Web Socket Connection
			census.socket = new ReconnectingWebSocket("wss://push.planetside2.com/streaming?service-id=s:ps2maps");
			census.socket.debug = false;
		};
		census.createSocket();

		census.socket.onopen = function()
		{
			// Websocket Subscriptions
			var subscription = '{"service":"event","action":"subscribe","worlds":["' + server.id + '"],"eventNames":["FacilityControl","ContinentLock","ContinentUnlock"]}';
			census.socket.send(subscription);
		};

		census.socket.onmessage = function(message)
		{
			// Receive Faction Control messages
			var data = JSON.parse(message.data);
			if ( data.payload ) {

				// Which Event Type?
				if ( data.payload.event_name == "FacilityControl") {
					/**
					 * Facility Control
					 */

					// If the continent is the current continent
					if ( data.payload.zone_id == continent.id ) {

						var faction = ps2maps.factions[data.payload.new_faction_id].slug;
						var facility_id = data.payload.facility_id;

						// If the facility exists on the map
						if ( ps2maps.facilities[facility_id] !== undefined ) {

							// If it's been more than 10 minutes (600 seconds) since last messaga received
							// (maybe computer went to sleep), then refresh the whole map first
							if (census.facilityOwnership.lastTimestamp && moment().diff(census.facilityOwnership.lastTimestamp, 'seconds') >= 600 ) {

								// Show the loading dialog
								var loading = $('.alert.loading').show();
								census.fetchFacilityOwnership(function(result){
									if ( result == true ) {
										// Update Menu with Continent Lock Status
										census.updateMenu();

										// Set current continent region ownership
										census.updateMap();

										// Hide the loading dialog
										loading.delay(500).fadeOut();
									} else {
										// Error message dialog
										loading.hide();
										var message = "Error loading map data from PlanetSide 2 servers";
										$('.alert.error').find('.text').html(message).parent().fadeIn();
									}
								});
							}

							// Log facility control event
							ps2maps.logFacilityControl(facility_id, data.payload.old_faction_id, data.payload.new_faction_id, data.payload.timestamp);

							// Set the facility faction
							ps2maps.facilities[facility_id].setFaction(faction);

							// Set the lattice colors
							for ( var lattice_id in ps2maps.facilities[facility_id].lattice ) {
								ps2maps.facilities[facility_id].lattice[lattice_id].setFaction();
							}

							// Calculate Linked Facilities
							ps2maps.findAllLinkedFacilities();

							// Set the region color
							if ( data.payload.old_faction_id == data.payload.new_faction_id ) {
								// Don't animate if old faction == new faction
								ps2maps.facilities[facility_id].region.setFaction(null);
							} else {
								// Animate it if it's a new faction
								ps2maps.facilities[facility_id].region.setFaction(null, true);
							}

							// Timestamp it
							census.facilityOwnership.lastTimestamp = moment();
						}
					}
				} else if ( data.payload.event_name == "ContinentLock" ) {
					/**
					 * Continent Lock
					 */
					var continent_id = data.payload.zone_id;
					var faction_id = data.payload.triggering_faction;

					// If the current continent is the continent being locked, set the entire continent to owned faction
					if ( continent.id == continent_id ) {
						census.setCurrentContinentOwner(faction_id);
					}

					// Add the faction and lock classes to the continent menu item
					$('nav li[data-id=' + continent_id + ']')
						.removeClass('nc tr vs')
						.addClass('locked ' + ps2maps.factions[faction_id].slug);

					// Log message
					ps2maps.logContinentLock(ps2maps.factions[faction_id], continents[continent_id]);

				} else if ( data.payload.event_name == "ContinentUnlock" ) {
					/**
					 * Continent Unlock
					 */

					var continent_id = data.payload.zone_id;

					// Remove all factions and lock classes from the continent menu item
					$('nav li[data-id=' + continent_id + ']').removeClass('nc tr vs locked');
				}
			}
		};

	} else {
		$('.alert-container .error').find('.text').html("Error connecting to PlanetSide 2 server").end().fadeIn();
	}
};

// Init Census Load Data
// Show the loading dialog
var loading = $('.alert.loading').show();
census.fetchFacilityOwnership(function(result){
	if ( result == true ) {
		// Update Menu with Continent Lock Status
		census.updateMenu();

		// Set current continent region ownership
		census.updateMap();

		// Subscripe to Websocket Service
		census.websocketSubscribe();

		// Hide the loading dialog
		loading.delay(500).fadeOut();
	} else {
		// Error message dialog
		loading.hide();
		var message = "Error loading map data from PlanetSide 2 servers";
		$('.alert.error').find('.text').html(message).parent().fadeIn();
	}
});

// var url = "http://census.soe.com/s:ps2maps/get/ps2:v2/map/?world_id=" + server.id + "&zone_ids=" + continent.id + "&callback=?";
// $.getJSON(url)
// 	.done(function(data){
// 		console.log(data);
// 		// Refresh the map
// 		//ps2maps.facilityControl.mapRefresh(data);
// 	}).fail(function(){
// 		// Cannot connect to Census API
// 		console.error('Error connecting to SOE Census API');
// 	});

// })();

// (function(){
// if ( Modernizr.websockets ) {

// 	ps2maps.facilityControl.createSocket = function()
// 	{
// 		var socketUrl = "wss://push.planetside2.com/streaming?service-id=s:ps2maps";

// 		// Create the Web Socket Connection
// 		ps2maps.facilityControl.socket = new ReconnectingWebSocket(socketUrl);
// 		ps2maps.facilityControl.socket.debug = false;
// 	};
// 	ps2maps.facilityControl.createSocket();

// 	ps2maps.facilityControl.mapRefresh = function(data)
// 	{
// 		if ( data.map_list == undefined )
// 			return false;

// 		// Set faction ownership of all facilties
// 		var faction, region;
// 		for ( var row in data.map_list[0].Regions.Row ) {

// 			// The faction
// 			faction = ps2maps.factions[data.map_list[0].Regions.Row[row].RowData.FactionId].slug;

// 			// The region id
// 			region_id = data.map_list[0].Regions.Row[row].RowData.RegionId;

// 			// If a facility exists, set it's faction
// 			if ( ps2maps.regions[region_id].facility ) {
// 				ps2maps.regions[region_id].facility.setFaction(faction);
// 			} else { // Otherwise, just set the region's faction
// 				ps2maps.regions[region_id].setFaction(faction);
// 			}
// 		}

// 		// Find each factions warpgates
// 		ps2maps.warpgates = {};
// 		for( id in continent.markers.facilities.warpgate ) {
// 			if ( continent.markers.facilities.warpgate[id].xy ) {
// 				ps2maps.warpgates[ps2maps.facilities[id].faction] = ps2maps.facilities[id];
// 			}
// 		}

// 		// Set lattice colors
// 		for( var index in ps2maps.lattice ) {
// 			ps2maps.lattice[index].setFaction() ;
// 		}

// 		// Calculate Linked Facilities
// 		ps2maps.findAllLinkedFacilities();

// 		// Set region colors
// 		for( var facility_id in ps2maps.facilities ) {
// 			if ( ps2maps.facilities[facility_id].region ) {
// 				ps2maps.facilities[facility_id].region.setFaction();
// 			}
// 		}

// 		// Timestamp it
// 		ps2maps.facilityControl.lastTimestamp = moment();

// 		return true;
// 	}

// 	ps2maps.facilityControl.fetchCurrentStatus = function()
// 	{
// 		// Fetch current facility control statistics
// 		var url = "http://census.soe.com/s:ps2maps/get/ps2:v2/map/?world_id=" + server.id + "&zone_ids=" + continent.id + "&callback=?";
// 		$.getJSON(url)
// 			.done(function(data){
// 				console.log(data);
// 				// Refresh the map
// 				ps2maps.facilityControl.mapRefresh(data);
// 			}).fail(function(){
// 				// Cannot connect to Census API
// 				console.error('Error connecting to SOE Census API');
// 			});
// 	}

// 	ps2maps.facilityControl.socket.onopen = function()
// 	{
// 		ps2maps.facilityControl.fetchCurrentStatus();
// 		// if ( ps2maps.facilityControl.fetchCurrentStatus() == true ) {
// 		// 	ps2maps.logText("Facility & Region Ownership data loaded");

// 		// 	// Websocket Subscriptions
// 		// 	var subscription = '{"service":"event","action":"subscribe","worlds":["' + server.id + '"],"eventNames":["FacilityControl","ContinentLock","ContinentUnlock"]}';
// 		// 	ps2maps.facilityControl.socket.send(subscription);

// 		// } else {
// 		// 	console.log('test');
// 		// 	console.error('Error connecting to SOE Census API');
// 		// }
// 	};

// 	// ps2maps.facilityControl.socket.onclose = function()
// 	// {
// 	// }

// 	ps2maps.facilityControl.socket.onmessage = function(message)
// 	{
// 		// Receive Faction Control messages
// 		var data = JSON.parse(message.data);
// 		if ( data.payload ) {

// 			// Ignore if not the current continent
// 			if ( data.payload.zone_id == continent.id ) {

// 				var faction = ps2maps.factions[data.payload.new_faction_id].slug;
// 				var facility_id = data.payload.facility_id;

// 				if ( ps2maps.facilities[facility_id] !== undefined ) {

// 					// If it's been more than 10 minutes since last update (maybe computer went to sleep), then refresh the whole map first
// 					if ( ps2maps.facilityControl.lastTimestamp && moment().diff(ps2maps.facilityControl.lastTimestamp, 'seconds') >= 600 ) {
// 						ps2maps.facilityControl.fetchCurrentStatus();
// 					}

// 					// Log facility control event
// 					ps2maps.logFacilityControl(facility_id, data.payload.old_faction_id, data.payload.new_faction_id, data.payload.timestamp);

// 					// If recapture, don't change color of the region
// 					// if ( data.payload.old_faction_id == data.payload.new_faction_id ) {
// 					// 	return true;
// 					// }

// 					// Set the facility faction
// 					ps2maps.facilities[facility_id].setFaction(faction);

// 					// Set the lattice colors
// 					for ( var lattice_id in ps2maps.facilities[facility_id].lattice ) {
// 						ps2maps.facilities[facility_id].lattice[lattice_id].setFaction();
// 					}

// 					// Calculate Linked Facilities
// 					ps2maps.findAllLinkedFacilities();

// 					// Set the region color
// 					ps2maps.facilities[facility_id].region.setFaction(null, true);

// 					// Timestamp it
// 					ps2maps.facilityControl.lastTimestamp = moment();
// 				}
// 			}
// 		}
// 	};
// } else {
// 	console.error("Web sockets are not supported on your browser");
// }

})();


