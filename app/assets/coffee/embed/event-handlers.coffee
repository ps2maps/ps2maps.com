# Update the maps
$$('body').on('territoryControlFetched', (e, data) ->

	# Loop thru the continents
	for continentId, regions of data

		if parseInt(continentId) != parseInt(continent.id)
			continue;

		# Loop thru the regions
		for regionId, factionId of regions

			# Set the region color
			ps2maps.regions[regionId].faction = ps2maps.factions[factionId]
			ps2maps.regions[regionId].facility.faction = ps2maps.factions[factionId]
			ps2maps.regions[regionId].path
				.attr('fill', colors[ps2maps.factions[factionId].slug].default)
				.attr('fill-opacity','0.5')

			# Set the marker icon color if exists
			$('li[data-id="' + ps2maps.regions[regionId].facility.id + '"] svg').removeClass('ns nc tr vs').addClass(ps2maps.factions[factionId].slug)

	# Census is finished loading
	$$('body').trigger('censusFinished')

	# Map has been updated
	$$('body').trigger('mapUpdated', data)
)

# Facility captured
$$('body').on('FacilityCaptured', (e, data) ->

	# Skip if not the current continent
	if parseInt(data.continentId) != parseInt(continent.id)
		return false

	timestamp = moment.unix(data.timestamp)

	# Has it been more than 10 minutes?
	if moment().diff(timestamp, 'minutes') >= 10

		# it's been more than 10 minutes, refreshing census
		console.log "Refreshing from Census";

		# Refresh the map data
		census.fetchTerritoryControl()

	# Set the faction
	ps2maps.facilities[data.facilityId].faction = ps2maps.factions[data.factionId]
	ps2maps.facilities[data.facilityId].region.faction = ps2maps.factions[data.factionId]

	# Animate color change -> #FFF -> faction color
	color = colors[ps2maps.factions[data.factionId].slug].default
	ps2maps.facilities[data.facilityId].region.path.animate
		fill: '#FFF', 500, ()->
			this.animate( fill: color, 1000 )

	$$('body').trigger('mapUpdated')

	# Trigger event
	data =
		facility:
			id: parseInt(data.facilityId)
			name: ps2maps.facilities[data.facilityId].name
		faction:
			id: parseInt(data.factionId)
			name: ps2maps.factions[data.factionId].name
			slug: ps2maps.factions[data.factionId].slug
		continent:
			id: parseInt(data.continentId)
			name: continents[data.continentId].name
			slug: continents[data.continentId].slug
		timestamp: parseInt(data.timestamp)

	$$('.map').trigger('FacilityCaptured', [data])
)

# Facility resecured
$$('body').on('FacilityResecured', (e, data) ->

	# Skip if not the current continent
	if parseInt(data.continentId) != parseInt(continent.id)
		return false

	# Trigger event
	data =
		facility:
			id: parseInt(data.facilityId)
			name: ps2maps.facilities[data.facilityId].name
		faction:
			id: parseInt(data.factionId)
			name: ps2maps.factions[data.factionId].name
			slug: ps2maps.factions[data.factionId].slug
		continent:
			id: parseInt(data.continentId)
			name: continents[data.continentId].name
			slug: continents[data.continentId].slug
		timestamp: parseInt(data.timestamp)

	$$('.map').trigger('FacilityResecured', [data])
)
