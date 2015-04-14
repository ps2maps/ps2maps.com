class Census
	debug: false

	fetchTerritoryControl: () ->

		# Census Territory Control URL
		url = "http://census.daybreakgames.com/s:ps2maps/get/ps2:v2/map/?world_id=" + server.id + "&zone_ids=" +  Object.keys(continents).join(',') + "&callback=?"

		# Fetch JSON results from Census
		$.getJSON(url)
			.done( (data) ->
				if data.map_list and data.map_list.length > 0

					# Format facility ownership into key'ed object arrays
					territoryControl = {}

					# Iterate through continents
					for continentIndex of data.map_list
						continent = data.map_list[continentIndex]
						territoryControl[continent.ZoneId] = []

						# Iterate through regions
						for regionIndex of continent.Regions.Row
							region = continent.Regions.Row[regionIndex].RowData
							territoryControl[continent.ZoneId][region.RegionId] = region.FactionId

					# Territory Control data has been fetched
					$('body').trigger('territoryControlFetched', territoryControl)

					# If no map exists, Census is finished
					if not ps2maps.map and not ps2maps.maps
						$('body').trigger('censusFinished')

					return true
				else
					console.error "Census Territory Control Fetch failed"
					return false

			).fail( () ->
				console.error "Census Territory Control Fetch failed"
				return false
			)

	setCurrentContinentOwner: (faction_id) ->
		faction = ps2maps.factions[faction_id].slug

		# Set faction owner for all regions
		for id of ps2maps.regions
			if ps2maps.regions[id].facility
				ps2maps.regions[id].facility.setFaction(faction)
			else
				ps2maps.regions[id].setFaction(faction)

		# Find each factions warpgates
		for id of continent.facilities.warpgate
			if continent.facilities.warpgate[id].xy
				ps2maps.warpgates[ps2maps.facilities[id].faction] = ps2maps.facilities[id]

		# Set lattice colors
		for index of ps2maps.lattice
			ps2maps.lattice[index].setFaction()

		# Set region colors
		for id of ps2maps.facilities
			if ps2maps.facilities[id].region
				ps2maps.facilities[id].region.setFaction()

		# Update the bar chart
		this.calculateFacilityOwnershipPercentage()

		# Timestamp it
		this.facilityOwnership.lastTimestamp = moment()

window.census = new Census()
