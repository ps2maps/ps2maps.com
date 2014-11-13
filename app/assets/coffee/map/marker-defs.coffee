# Default Marker Size Options
optionsDefault =
	className: 'svgIcon'
	iconSize: [24,24]
	iconAnchor: [12,12]
	labelAnchor: [0,0]

# Large Marker Size Options
optionsLarge =
	className: 'svgIcon'
	iconSize: [32,32]
	iconAnchor: [16,16]
	labelAnchor: [0,0]

for type in ps2maps.facilityTypes
	switch type
		when 'amp_station', 'bio_lab', 'interlink_facility', 'tech_plant', 'warpgate'
			options = optionsLarge
		else
			options = optionsDefault

	ps2maps.icons[type] = {}

	for faction in ps2maps.factions
		html = "<svg viewBox='0 0 256 256' class='marker-icon " + type + " " + faction.slug + "'><use xlink:href='#" + type + "'></use></svg>"
		options.html = html
		ps2maps.icons[type][faction.slug] = L.divIcon(options)
