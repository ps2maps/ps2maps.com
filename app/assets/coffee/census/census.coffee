class Census
	facilityOwnership: {}

	censusTerritoryOwnership: (callback) ->

		census = this
		url = "http://census.soe.com/s:ps2maps/get/ps2:v2/map/?world_id=" + server.id + "&zone_ids=" + continentIds + "&callback=?"

		# Fetch JSON results from Census
		$.getJSON(url)
			.done( (data) ->
				if data.map_list and data.map_list.length > 0

					# Format facility ownership into key'ed object arrays
					for continentIndex of data.map_list
						continent = data.map_list[continentIndex]
						census.facilityOwnership[continent.ZoneId] = []
						for regionIndex of continent.Regions.Row
							region = continent.Regions.Row[regionIndex].RowData
							census.facilityOwnership[continent.ZoneId][region.RegionId] = region.FactionId

					callback(true)
				else
					callback(false)
				return
			).fail( () ->
				callback(false)
				return
			)

	updateTerritoryChart: () ->
		# Tally up owned territories
		# Start at -1 because Warpgates don't count
		territories = { vs: -1, tr: -1, nc: -1 }
		for facility in ps2maps.facilities
			territories[facility.faction] += 1

		# Calculate Total number of territories
		total = territories.vs + territories.tr + territories.nc

		# Convert values to percentages
		for territory in territories
			territory = Math.round(territory/total*100)
			if territory < 0
				territory = 0
			else if territory > 100
				territory = 100

		# Update the territory control chart
		window.updateTerritoryChart([territories.vs, territories.tr, territories.nc])

	updateMenu: () ->
		for continentId of census.facilityOwnership
			factionId = null
			locked = true
			for regionId of census.facilityOwnership[continentId]
				if factionId == null
					factionId = census.facilityOwnership[continentId][regionId]
					continue
				else if census.facilityOwnership[continentId][regionId] != factionId
					locked = false
					break

			# Locked Continent
			if locked == true
				$('nav li[data-id=' + continentId + ']')
					.removeClass('nc tr vs')
					.addClass('locked ' + ps2maps.factions[factionId].slug)
			else
				$('nav li[data-id=' + continentId + ']').removeClass('nc tr vs locked')

	updateMap: () ->

		# Set faction ownership of all facilties
		for regionId,region of this.facilityOwnership[continent.id]

			# The faction
			faction = ps2maps.factions[this.facilityOwnership[continent.id][regionId]].slug

			# Does region have a facility?
			if ps2maps.regions[regionId].facility

				# Yes, set it's faction
				ps2maps.regions[regionId].facility.setFaction(faction)

			else

				# No, set the region's faction
				ps2maps.regions[regionId].setFaction(faction)

		# Find each factions warpgates
		for id of continent.facilities.warpgate
			if continent.facilities.warpgate[id].xy
				ps2maps.warpgates[ps2maps.facilities[id].faction] = ps2maps.facilities[id]

		# Set lattice colors
		for link in ps2maps.lattice
			link.setFaction()

		# Set region colors
		for id of ps2maps.facilities
			if ps2maps.facilities[id].region
				ps2maps.facilities[id].region.setFaction()

		# Update the bar chart
		this.updateTerritoryChart()

		# Timestamp it
		this.facilityOwnership.lastTimestamp = moment()

		ps2maps.logText("Facility & Region Ownership data loaded")

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

	websocketSubscribe: () ->

		# If websockets not supported
		if not Modernizr.websockets
			$('.alert-container .error').find('.text').html("Error connecting to PlanetSide 2 server").end().fadeIn()
			return false

		# Create the Web Socket Connection
		this.createSocket = () ->
			this.socket = new ReconnectingWebSocket("wss://push.planetside2.com/streaming?service-id=s:ps2maps")
			this.socket.debug = false
			return
		this.createSocket()

		# When websocket is opened
		this.socket.onopen = () ->
			# Websocket Subscriptions
			subscription = '{"service":"event","action":"subscribe","worlds":["' + server.id + '"],"eventNames":["FacilityControl","ContinentLock","ContinentUnlock"]}'
			this.send(subscription)
			return

		# Websocket message handler
		this.socket.onmessage = (message) ->

			# Receive Faction Control messages
			data = JSON.parse(message.data)
			if not data.payload
				return false

			# Which event type?
			switch data.payload.event_name

				# Facility Control changes
				when "FacilityControl"

					# Ignore if not for current continent
					if data.payload.zone_id != continent.id
						return false

					faction = ps2maps.factions[data.payload.new_faction_id].slug
					facility_id = data.payload.facility_id

					# Ignore if facility does not exist
					if not ps2maps.facilities[facility_id]
						return false

					# If it's been more than 10 minutes (600 seconds) since last messaga received
					# (maybe computer went to sleep), then refresh the whole map first
					if this.facilityOwnership.lastTimestamp && moment().diff(census.facilityOwnership.lastTimestamp, 'seconds') >= 600

						# Show the loading dialog
						loading = $('.alert.loading').show()
						this.censusUpdate((result) ->
							if result == true
								# Update Menu with Continent Lock Status
								this.updateMenu()

								# Set current continent region ownership
								this.updateMap()

								# Hide the loading dialog
								loading.delay(500).fadeOut()

							else

								# Error message dialog
								loading.hide()
								message = "Error loading map data from PlanetSide 2 servers"

								$('.alert.error').find('.text').html(message).parent().fadeIn()
						)

					# Log facility control event
					ps2maps.logFacilityControl(facility_id, data.payload.old_faction_id, data.payload.new_faction_id, data.payload.timestamp)

					# Set the facility faction
					ps2maps.facilities[facility_id].setFaction(faction)

					# Set the lattice colors
					for lattice_id of ps2maps.facilities[facility_id].lattice
						ps2maps.facilities[facility_id].lattice[lattice_id].setFaction()

					# Set the region color
					if data.payload.old_faction_id == data.payload.new_faction_id

						# Don't animate if old faction == new faction
						ps2maps.facilities[facility_id].region.setFaction(null)

					else

						# Animate it if it's a new faction
						ps2maps.facilities[facility_id].region.setFaction(null, true)

					# Update Territory Control Bar Chart
					census.updateTerritoryChart()

					# Timestamp it
					census.facilityOwnership.lastTimestamp = moment()

				# Continent Lock
				when "ContinentLock"
					continent_id = data.payload.zone_id
					faction_id = data.payload.triggering_faction

					# If the current continent is the continent being locked, set the entire continent to owned faction
					if continent.id == continent_id
						census.setCurrentContinentOwner(faction_id)

					# Add the faction and lock classes to the continent menu item
					$('nav li[data-id=' + continent_id + ']')
						.removeClass('nc tr vs')
						.addClass('locked ' + ps2maps.factions[faction_id].slug)

					# Log message
					ps2maps.logContinentLock(ps2maps.factions[faction_id], continents[continent_id])

					# Update Territory Control Bar Chart
					census.updateTerritoryChart()

				# Continent Unlock
				when "ContinentUnlock"

					# Remove all factions and lock classes from the continent menu item
					$('nav li[data-id=' + data.payload.zone_id + ']').removeClass('nc tr vs locked')

			return

	# Init Census Load Data
	# Show the loading dialog
	loading = $('.alert.loading').show()

	refresh: () ->
		census = this

		# Fetch the territory ownership from census
		this.censusTerritoryOwnership((result)->

			if result == true

				# Update Menu with Continent Lock Status
				census.updateMenu()

				# Set current continent region ownership
				census.updateMap()

				# Subscripe to Websocket Service
				census.websocketSubscribe()

				# Hide the loading dialog
				loading.delay(500).fadeOut()

			else

				# Error message dialog
				loading.hide()

				message = "Error loading map data from PlanetSide 2 servers"

				$('.alert.error').find('.text').html(message).parent().fadeIn()
		)
		return


window.census = new Census()
window.census.refresh()

