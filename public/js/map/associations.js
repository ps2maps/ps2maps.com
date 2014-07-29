// Associate Regions, Facilities and Lattice Links
(function(){

// Associate regions and facilities
for( var region_id in continent.regions ) {
	if ( ps2maps.facilities[continent.regions[region_id].facility_id] ) {
		ps2maps.regions[region_id].facility = ps2maps.facilities[continent.regions[region_id].facility_id];
		ps2maps.facilities[continent.regions[region_id].facility_id].region = ps2maps.regions[region_id];
	}
}

for( var index in ps2maps.lattice ) {
	// Iterate through facilities on each lattice link
	for( var facility_id in ps2maps.lattice[index].facilities) {

		// Associate facilities with lattice links
		ps2maps.facilities[facility_id].lattice.push(ps2maps.lattice[index]);

		// Associate facilities with other linked facilities
		for( var linked_facility_id in ps2maps.lattice[index].facilities ) {
			if ( facility_id != linked_facility_id ) {
				ps2maps.facilities[facility_id].facilities.push(ps2maps.facilities[linked_facility_id]);
			}
		}
	}
}

})();

