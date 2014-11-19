# Default Icon Size Options
optionsDefault =
	className: 'svgIcon'
	iconSize: [24,24]
	iconAnchor: [12,12]
	labelAnchor: [0,0]

# Large Icon Size Options
optionsLarge =
	className: 'svgIcon'
	iconSize: [32,32]
	iconAnchor: [16,16]
	labelAnchor: [0,0]

# Create Icon for each facility type
iconCache = {}
svgContainer = $('#svg-sprites')

for type of ps2maps.facilityTypes

	switch type
		# Large Icons
		when 'amp_station', 'bio_lab', 'interlink_facility', 'tech_plant', 'warpgate'
			options = optionsLarge

		# Default Icons
		else
			options = optionsDefault

	ps2maps.icons[type] = {}

	$svgContainer = $('#svg-sprites')

	# Define the Icons
	for id,faction of ps2maps.factions

		# Icon HTML
		html  = "<svg viewBox='0 0 256 256' class='marker-icon " + type + " " + faction.slug + "'>";

		# If cached,
		if iconCache[type]
			html += iconCache[type];
		else

			# Find the SVG's html
			tmp = $svgContainer.find('#'+type).html();

			# Cache the result
			iconCache[type] = tmp

			# Add to the icon's html
			html += tmp

		html += "</svg>"
		options.html = html
		ps2maps.icons[type][faction.slug] = L.divIcon(options)

# Iterate through continent facilities
for facility_type, facilities of continent.facilities

	# Marker options
	options =
		icon: ps2maps.icons[facility_type].ns
		pane: 'markerPane'

	# Marker Label Options
	labelOptions =
		noHide: true
		offset: [0,0]
		pane: 'markerLabelsPane'

	# Set the marker pane
	switch facility_type

		# Facilities
		when 'amp_station', 'bio_lab', 'interlink_facility', 'tech_plant', 'warpgate'
			options.pane = 'facilitiesPane'
			labelOptions.pane = 'facilitiesLabelsPane'

		# Large and Small Outposts
		when 'large_outpost', 'small_outpost'
			options.pane = 'outpostsPane'
			labelOptions.pane = 'outpostsLabelsPane'

	# Loop through facilities
	for id,facility of facilities

		# If marker has no coordinates, skip it
		if !facility.xy
			continue

		# Create the marker
		marker = L.marker(facility.xy, options)

		# Apply Label
		if facility.name
			marker.bindLabel(facility.name, labelOptions)
			marker.name = facility.name

		# Set marker attributes
		marker.id = id
		marker.faction = 'ns'
		marker.facilityType = facility_type
		marker.region = null
		marker.lattice = []
		marker.facilities = []



		# Is the marker linked to the warpgate
		marker.isLinked = () ->
			linked = []
			faction = this.faction
			id = this.id

			# Recursively check linked facilities
			checkLinkedFacilities = (facility) ->

				# Add this facility to list of linked
				linked.push facility.id

				# Cycle through linked facilities
				for f in facility.facilities

					# You found the facility, which means it's linked
					if f.id == id
						return true

					# If the facility is the same faction and
					# has not already been checked, then
					# check its linked facilities
					if f.faction == faction and f.id not in linked
						if checkLinkedFacilities(f) == true
							return true

				return false

			# Check linked facilities starting with warpgate
			return checkLinkedFacilities(ps2maps.warpgates[this.faction])



		# Set the marker faction
		marker.setFaction = (faction) ->
			this.faction = faction

			if ( !this.setIcon )
				return false

			switch faction
				when 'vs', 'nc', 'tr'
					this.setIcon(ps2maps.icons[this.facilityType][faction])
				else
					this.setIcon(ps2maps.icons[this.facilityType].ns)

		# Add marker to map
		marker.addTo(ps2maps.map)

		# Add marker to list of facilities
		ps2maps.facilities[id] = marker
