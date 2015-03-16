# Timestamp Update
timestampUpdate = (id, timestamp) ->

	# Save the timestamp
	continents[id].timestamp = timestamp

	# Update the continent timestamp duration
	timestampDurationUpdate(id)

	# Set the timestamp in the html
	$$("div.continent[data-id='" + id + "'] .timestamp-actual").html(timestamp.format(timeFormat))

timestampDurationUpdate = (id) ->

	$$(".continent[data-id='" + id + "'] .timestamp-duration").html( moment.duration(moment().diff(continents[id].timestamp)).humanize() + " ago")

# Update the maps
$$('body').on('territoryControlFetched', (e, data) ->

	# Loop thru the continents
	for continentId, regions of data

		# Loop thru the regions
		for regionId, factionId of regions

			# Set the region color
			ps2maps.regions[regionId].faction = ps2maps.factions[factionId]
			ps2maps.regions[regionId].facility.faction = ps2maps.factions[factionId]
			ps2maps.regions[regionId].path.attr('fill', colors[ps2maps.factions[factionId].slug].default)

			# Set the marker icon color if exists
			$('li[data-id="' + ps2maps.regions[regionId].facility.id + '"] svg').removeClass('ns nc tr vs').addClass(ps2maps.factions[factionId].slug)

	# Initial timestamp update
	for id,continent of continents
		timestampUpdate(id, moment())

	# Update the timestamp durations every second
	setInterval(->
		for id,continent of continents
			timestampDurationUpdate(id)
	, 30000)

	# Census is finished loading
	$$('body').trigger('censusFinished')

	# Map has been updated
	$$('body').trigger('mapUpdated', data)
)

# Facility captured
$$('body').on('FacilityCaptured', (e, data) ->

	# If continent exists
	if data.continentId not in Object.keys(continents)
		return false

	timestamp = moment.unix(data.timestamp)

	# Has it been more than 10 minutes?
	if moment().diff(timestamp, 'minutes') >= 10

		console.log "It's been more than 10 minutes. Refreshing from Census";

		# Refresh the map data
		census.fetchTerritoryControl()



	# Update continent timestamp
	timestampUpdate(data.continentId, moment.unix(data.timestamp))
	timestampDurationUpdate(data.continentId)

	# Set the faction
	ps2maps.facilities[data.facilityId].faction = ps2maps.factions[data.factionId]
	ps2maps.facilities[data.facilityId].region.faction = ps2maps.factions[data.factionId]

	# Set the marker icon color if it exists
	$('li[data-id="' + data.facilityId + '"] svg').removeClass('ns nc tr vs').addClass(ps2maps.factions[data.factionId].slug)

	# Animate color change -> #FFF -> faction color
	color = colors[ps2maps.factions[data.factionId].slug].default
	ps2maps.facilities[data.facilityId].region.path.animate(
		fill: '#FFF', 500, ()->
			this.animate( fill: color, 1000 )
		)

	$$('body').trigger('mapUpdated')

)

# Facility resecured
$$('body').on('FacilityResecured', (e, data) ->

	if data.continentId not in Object.keys(continents)
		return false

	# Update timestamp
	timestampUpdate(data.continentId, moment.unix(data.timestamp))
)
