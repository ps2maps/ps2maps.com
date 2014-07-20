// Associate Regions, Facilities and Lattice Links
(function(){

	// Associate regions and facilities
	for( region_id in continent.regions ) {
		if ( ps2maps.facilities[continent.regions[region_id].facility_id] ) {
			ps2maps.regions[region_id].facility = ps2maps.facilities[continent.regions[region_id].facility_id];
			ps2maps.facilities[continent.regions[region_id].facility_id].region = ps2maps.regions[region_id];
		}
	}

	// Associate facilities with lattice links
	for( index in ps2maps.lattice ) {
		for( facility_index in ps2maps.lattice[index].facilities) {
			ps2maps.lattice[index].facilities[facility_index].latticeLinks.push(ps2maps.lattice[index]);

		}
	}
})();
