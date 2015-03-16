# Reorganize facilities
for type,facilities of window[continent.slug].facilities
	for id,facility of facilities
		window[continent.slug].facilities[id] = facility

# Snap.svg
s = Snap('.map > svg')

w = 768
h = 768

s.attr({
	viewBox: "0 0 " + w + " " + h,
	width: "100%",
	height: "100%"
});

# Use Continent image as background
s.image("/img/" + continent.slug + "-large.jpg", 0, 0, w, h);

# Group for paths
group = s.g()

# Loop thru regions
for regionId, region of window[continent.slug].regions

	# Generate the polygon path string
	string = "M" + region.points[0][0] + "," + region.points[0][1]
	for point in region.points
		string += "L" + point[0] + "," + point[1]
	string += "z"

	# Create the region's polygon path
	path = s.path(string)
	path.attr('fill-opacity','0.0').attr('stroke','#000').attr('stroke-width', 0.5)

	# Save the region
	ps2maps.regions[regionId] =
		id: regionId
		path: path

	# Save the facility
	ps2maps.facilities[region.facility_id] =
		id: region.facility_id
		region: ps2maps.regions[regionId]
		name: window[continent.slug].facilities[region.facility_id].name

	# Reverse association
	ps2maps.regions[regionId].facility = ps2maps.facilities[region.facility_id]

	# Append to group
	group.append(path)

# Transform and scale regions to fit the continent image
group.transform("T0,0R0S3,3,0,0")


