# Associate regions and facilities
for id,region of continent.regions
	if ps2maps.facilities[region.facility_id]
		ps2maps.regions[id].facility = ps2maps.facilities[region.facility_id]
		ps2maps.facilities[region.facility_id].region = ps2maps.regions[id]

# Loop through lattice links
for index,link of ps2maps.lattice

	# Loop through facilities on each lattice link
	for id, facility of link.facilities

		# Associate facilities with lattice links
		ps2maps.facilities[id].lattice.push(link)

		# Associate facilities with other linked facilities
		for linked_facility_id, facility of link.facilities
			if id != linked_facility_id
				ps2maps.facilities[id].facilities.push(ps2maps.facilities[linked_facility_id])
