ps2maps.maps = []

w = 768
h = 768

# Loop thru continents
for continentId,continent of continents

	# Create Raphael Paper
	paper = Raphael(continent.slug + '-map', w, h)
	continents[continentId].paper = paper
	ps2maps.maps.push(paper)

	# Set the paper to be responsive
	paper.setViewBox(0,0,w,h,true)
	paper.setSize('100%','100%')

	# Use Continent image as background
	paper.image('/img/' + continent.slug + '.jpg', 0, 0, w, h)

	# Start creating paths
	paper.setStart()

	# Loop thru regions
	for regionId, region of window[continent.slug].regions

		# Generate the polygon path string
		string = "M" + region.points[0][0] + "," + region.points[0][1]
		for point in region.points
			string += "L" + point[0] + "," + point[1]
		string += "z"

		# Create the region's polygon path
		path = paper.path(string)
		path.attr('fill-opacity','0.5').attr('stroke','#000')

		# Save the region
		ps2maps.regions[regionId] =
			id: regionId
			path: path

		# Save the facility
		ps2maps.facilities[region.facility_id] =
			id: region.facility_id
			region: ps2maps.regions[regionId]

		# Reverse association
		ps2maps.regions[regionId].facility = ps2maps.facilities[region.facility_id]

	# Complete the paths set
	set = paper.setFinish()

	# Transform and scale regions to fit the continent image
	set.transform("T0,0R0S3,3,0,0")


