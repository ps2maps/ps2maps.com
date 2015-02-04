# Sidebar Nav Menu Toggle
$$('.nav-sidebar-open').on('click', ()->
	$$('#wrapper').toggleClass('toggled')
)

$$('#overlay, span.nav-sidebar-close').on('click', ()->
	$$('#wrapper').removeClass('toggled')
)

# Top Nav Continent Menu Update
$$('body').on('territoryControlFetched', (e, data) ->

	# Iterate through the continents
	for continentId, continent of data
		lastFactionId = null
		locked = true

		# Determine locked status, iterate through regions
		for regionId, factionId of continent

			# For the first iteration, set the faction id
			if lastFactionId == null
				lastFactionId = factionId
				continue

			# If region faction doesn't match first faction, then it's not locked
			else if factionId != lastFactionId
				locked = false
				break

		# Locked Continent
		if locked == true
			$$('.nav li[data-id=' + continentId + ']')
				.removeClass('nc tr vs').addClass(ps2maps.factions[factionId].slug)

			# If this is the current continent, update the territory control chart
			if parseInt(continent.id) == parseInt(continentId)
				$$('.territory-control').removeClass('nc tr vs').addClass(ps2maps.factions[factionId].slug)

		# Not a locked continent
		else
			$$('.nav li[data-id=' + continentId + ']').removeClass('nc tr vs')

	return
)

# Create WebSocket and Subscribe
$$('body').on('censusFinished', (e,data) ->

	# Check Websocket support
	if not Modernizr.websockets
		console.error "Websockets not supported"
		return false

	# If socket exists and is not OPEN, then refresh it. This might not work since refresh doesn't work on closed connection
	if ps2maps.socket and ps2maps.socket.readyState != WebSocket.OPEN
		ps2maps.socket.refresh()
		return

	# Create the Web Socket Connection
	ps2maps.socket = new ReconnectingWebSocket("wss://push.planetside2.com/streaming?service-id=s:ps2maps")
	ps2maps.socket.debug = false

	# ps2maps.socket.onconnecting = (e) ->
	# 	console.log "Websocket connecting........", e
	# return true

	# On Error handler
	ps2maps.socket.onerror = (e) ->
		console.error "WebSocket Error:", e
		return true

	# ps2maps.socket.onconnect = (e) ->
	# 	console.log "Websocket connected", e
	# 	return true

	# On Open Handler
	ps2maps.socket.onopen = () ->

		# Subscribe
		subscription = '{"service":"event","action":"subscribe","worlds":["' + server.id + '"],"eventNames":["FacilityControl","ContinentLock","ContinentUnlock"]}'
		this.send(subscription)
		return true

	# Websocket message handler
	ps2maps.socket.onmessage = (message) ->

		# Receive Faction Control messages
		data = JSON.parse(message.data)

		switch data.type

			# when "serviceStateChanged"
			# 	console.log "service state change"

			# when "heartbeat"
			# 	console.log "heartbeat"

			# Service Message
			when "serviceMessage"

				# Normal service message
				if not data.payload
					return false

				# Which event type?
				switch data.payload.event_name

					# Facility Control changes
					when "FacilityControl"

						# If its been more than 10 minutes, do a full map refresh
						# if timestamp && moment().diff(timestamp, 'seconds') >= 600
						# 	census.fetchTerritoryControl()

						# Is new faction the same as the old faction?
						if ( data.payload.new_faction_id == data.payload.old_faction_id )
							# Facility Resecured
							$$('body').trigger('FacilityResecured',
								continentId: data.payload.zone_id,
								facilityId: data.payload.facility_id,
								factionId: data.payload.new_faction_id,
								timestamp: data.payload.timestamp
							)

						else
							# Facility Captured
							$$('body').trigger('FacilityCaptured',
								continentId: data.payload.zone_id,
								facilityId: data.payload.facility_id,
								factionId: data.payload.new_faction_id,
								timestamp: data.payload.timestamp
							)

					# Continent Lock
					when "ContinentLock"
						$$('body').trigger('ContinentLocked',
							continentId: data.payload.zone_id,
							factionId: data.payload.triggering_faction
						)

					# Continent Unlock
					when "ContinentUnlock"
						$$('body').trigger('ContinentUnlocked',
							continentId: data.payload.zone_id
						)

		return
)

# Continent Lock Update Menu
$$('body').on('ContinentLocked', (e,data) ->

	# Add the faction and lock classes to the continent menu item
	$$('.nav li[data-id=' + data.continentId + ']')
		.removeClass('nc tr vs')
		.addClass(ps2maps.factions[data.factionId].slug)

	return true
)

# Continent Unlock Update Menu
$$('body').on('ContinentUnlocked', (e,data) ->

	# Remove all factions and lock classes from the continent menu item
	$$('.nav li[data-id=' + data.continentId + ']').removeClass('nc tr vs')

	return true
)

