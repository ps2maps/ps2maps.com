# Sidebar hide/show
sidebar = $$('.sidebar')
$$('.sidebar-toggle').on('click', (e) ->
	if sidebar.hasClass('visible')
		sidebar.removeClass('visible')
		store.set('ps2maps.sidebar.visible', false)
	else
		sidebar.addClass('visible')
		store.set('ps2maps.sidebar.visible', true)
)

# Sidebar init hide/show
if store.get('ps2maps.sidebar.visible', true) == true
	sidebar.addClass('visible')

# Sidebar Filters - Terrain / Tiles
$$('.control-terrain').on('change', (e) ->

	if $(this).is(':checked')
		$$('.leaflet-tile-pane').removeClass('hidden')
		store.set('ps2maps.sidebar.filter.tiles', true)
	else
		$$('.leaflet-tile-pane').addClass('hidden')
		store.set('ps2maps.sidebar.filter.tiles', false)

).prop('checked', store.get('ps2maps.sidebar.filter.tiles')).trigger('change')

# Sidebar Filters - Facilities
$$('.control-facilities').on('change', (e) ->

	if $(this).is(':checked')
		$$('.leaflet-facilities-pane, .leaflet-facilitiesLabels-pane, .leaflet-outposts-pane, .leaflet-outpostsLabels-pane').removeClass('hidden')
		store.set('ps2maps.sidebar.filter.facilities', true)
	else
		$$('.leaflet-facilities-pane, .leaflet-facilitiesLabels-pane, .leaflet-outposts-pane, .leaflet-outpostsLabels-pane').addClass('hidden')
		store.set('ps2maps.sidebar.filter.facilities', false)

).prop('checked', store.get('ps2maps.sidebar.filter.facilities')).trigger('change')

# Sidebar Filters - Lattice
$$('.control-lattice').on('change', (e) ->

	if $(this).is(':checked')
		$$('.leaflet-lattice-pane').removeClass('hidden')
		store.set('ps2maps.sidebar.filter.lattice', true)
	else
		$$('.leaflet-lattice-pane').addClass('hidden')
		store.set('ps2maps.sidebar.filter.lattice', false)

).prop('checked', store.get('ps2maps.sidebar.filter.lattice')).trigger('change')

# Sidebar Filters - Territory Control
$$('.control-territories').on('change', (e) ->

	switch $(this).find('option:selected').val()

		# Show territory control colors
		when 'color'
			$$('.leaflet-regions-pane').removeClass('hidden')
			$$('.leaflet-regionsNoColor-pane').addClass('hidden')
			store.set('ps2maps.sidebar.filter.territories', 'color')

		# Show no color territories
		when 'nocolor'
			$$('.leaflet-regionsNoColor-pane').removeClass('hidden')
			$$('.leaflet-regions-pane').addClass('hidden')
			store.set('ps2maps.sidebar.filter.territories', 'nocolor')

		# Hide
		when 'hide'
			$$('.leaflet-regions-pane, .leaflet-regionsNoColor-pane').addClass('hidden')
			store.set('ps2maps.sidebar.filter.territories', 'hide')

).val(store.get('ps2maps.sidebar.filter.territories')).trigger('change')

# Sidebar Filters - Grid
$$('.control-grid').on('change', (e) ->

	switch $(this).find('option:selected').val()

		# Show Grid
		when 'grid'
			$$('.leaflet-grid-pane, .leaflet-gridLabels-pane').removeClass('hidden')
			$$('.leaflet-subGrid-pane').addClass('hidden')
			store.set('ps2maps.sidebar.filter.grid', 'grid')

		# Show Grid and Subgrid
		when 'both'
			$$('.leaflet-grid-pane, .leaflet-gridLabels-pane, .leaflet-subGrid-pane').removeClass('hidden')
			store.set('ps2maps.sidebar.filter.grid', 'both')

		# Hide both
		when 'hide'
			$$('.leaflet-grid-pane, .leaflet-gridLabels-pane, .leaflet-subGrid-pane').addClass('hidden')
			store.set('ps2maps.sidebar.filter.grid', 'hide')

).val(store.get('ps2maps.sidebar.filter.grid')).trigger('change')

# Full Map Update
$$('body').on('territoryControlFetched', (e, data) ->

	sameFaction = true
	prevFaction = null

	# Set faction ownership of all facilties
	for regionId,region of data[continent.id]

		# The faction
		faction = ps2maps.factions[data[continent.id][regionId]].slug

		# Check if the previous faction has been set yet
		if prevFaction == null
			prevFaction = faction

		# Check if previous faction is different than this faction
		if prevFaction != faction
			sameFaction = false

		# Does region have a facility?
		if ps2maps.regions[regionId].facility

			# Yes, set it's faction
			ps2maps.regions[regionId].facility.setFaction(faction)

		else

			# No, set the region's faction
			ps2maps.regions[regionId].setFaction(faction)

	if sameFaction == true
		$$('.territory-control').removeClass('nc tr vs').addClass(prevFaction)

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
			ps2maps.facilities[id].region.setFaction(ps2maps.facilities[id].faction)

	# Timestamp it
	timestamp = moment()

	ps2maps.logText("Territory Control data loaded")

	# Census is finished loading
	$$('body').trigger('censusFinished')

	# Map has been updated
	$$('body').trigger('mapUpdated', data)
)

# Territory Control Chart Update
$$('body').on('mapUpdated', (e, data) ->

	# Tally up owned territories
	# Start at -1 because Warpgates don't count
	territories = { vs: -1, tr: -1, nc: -1 }
	for id,facility of ps2maps.facilities
		territories[facility.faction] += 1

	# Calculate Total number of territories
	total = territories.vs + territories.tr + territories.nc

	# Convert territory ownership values to percentages
	for faction,territory of territories
		territories[faction] = Math.round(territory/total*100)
		if territories[faction] < 0
			territories[faction] = 0
		else if territories[faction] > 100
			territories[faction] = 100

	# Update mobile sidebar nav facility control percentages
	$$('#sidebar-wrapper .vs .percentage').text(territories.vs + "%")
	$$('#sidebar-wrapper .tr .percentage').text(territories.tr + "%")
	$$('#sidebar-wrapper .nc .percentage').text(territories.nc + "%")

	# Update the territory control chart
	window.updateTerritoryChart([territories.vs, territories.tr, territories.nc])
)

$$('body').on('FacilityResecured', (e,data) ->

	# Ignore if not for current continent
	if parseInt(data.continentId) != parseInt(continent.id)
		return false

	faction = ps2maps.factions[data.factionId].slug
	facilityId = data.facilityId

	# Ignore if facility does not exist
	if not ps2maps.facilities[facilityId]
		return false

	# Log facility control event
	ps2maps.logFacilityResecure(facilityId, data.factionId, data.timestamp)
)

# Receive WebSocket Facility Control Message
$$('body').on('FacilityCaptured', (e, data) ->

	# Ignore if not for current continent
	if parseInt(data.continentId) != parseInt(continent.id)
		return false

	faction = ps2maps.factions[data.factionId].slug
	facilityId = data.facilityId

	# Ignore if facility does not exist
	if not ps2maps.facilities[facilityId]
		return false

	# Log facility control event
	ps2maps.logFacilityCapture(facilityId, data.factionId, data.timestamp)

	# Set the facility faction
	ps2maps.facilities[facilityId].setFaction(faction)

	# Set the lattice colors
	for lattice_id of ps2maps.facilities[facilityId].lattice
		ps2maps.facilities[facilityId].lattice[lattice_id].setFaction()

	# Set the region faction
	ps2maps.facilities[facilityId].region.setFaction(faction, true)

	# Timestamp it
	# ps2maps.lastTimestamp = moment()

	$$('body').trigger('mapUpdated', data)
)

# Continent Lock Update Territory Chart, Log Message, Update Map
$$('body').on('ContinentLocked', (e,data) ->

	# Log message
	ps2maps.logContinentLock(ps2maps.factions[data.factionId], continents[data.continentId])

	# If current continent, update Territory Control Chart
	if data.continentId == continent.id
		$$('.territory-control').removeClass('nc tr vs').addClass(ps2maps.factions[data.factionId].slug)

	return
)

# Continent Unlock Update Territory Control Chart
$$('body').on('ContinentUnlocked', (e,data) ->

	# Log message
	ps2maps.logContinentUnlock(continents[data.continentId])

	# If current continent, return territory control chart back to normal
	if data.continentId == continent.id
		$$('.territory-control').removeClass('nc tr vs');

	return
)

# Filter checkbox handling
$$('.filter-checkbox').on('click', () ->

	$this = $(this)
	type = $this.data('filter')
	checked = $this.is(':checked')

	store.set('ps2maps.log.filter.' + type, checked)

	if checked == true
		$$('.log-list ul').find('.'+type).fadeIn()
	else
		$$('.log-list ul').find('.'+type).fadeOut()

)

# Log Minimize (?)
# $$('.log-minimize').on('click', () ->

# 	if  $$('.log-body').is(':visible')
# 		$(this).addClass('closed')
# 		$$('.log-body').hide()
# 	else
# 		$(this).removeClass('closed')
# 		$$('.log-body').show()
# )

# Log clear button
$$('.clear-button').on('click', () ->
	if confirm("Clear the Territory Control Log history?")
		$$('.log-body li').remove()
)
