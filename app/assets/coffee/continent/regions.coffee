# Region Click
regionClick = (e) ->
	details = $('.facility-details')

	# Set the facility name
	details.find('h2.name').text(e.target.facility.name)

	# Set the icon
	details.find('.type svg').replaceWith("<svg class='" + e.target.facility.faction + "'><use xlink:href='/img/sprites.svg#" + e.target.facility.facilityType + "'/></svg>")

	# Set the facility type name
	details.find('.type .name').html( ps2maps.facilityTypes[e.target.facility.facilityType].name )

	# Set the faction name
	details.find('.faction').html( ps2maps.factionSlugs[e.target.facility.faction].name + " controlled")

	# Set the faction icon
	details.find('.faction-logo').hide().siblings('.' + e.target.facility.faction).show();

	details.slideDown()

# Region Mouse Over
regionMouseOver = (e) ->
	e.target.bringToFront().setStyle(
		weight:3
		color: '#FFF'
		fillColor: this.style.fillColor
	)

# Region Mouse Out
regionMouseOut = (e) ->
	e.target.setStyle(e.target.style)

regions = []

# Create the region polygons
for id,value of continent.regions
	region = L.polygon( value.points, ps2maps.styles.regions.ns.default )

	# Event handlers
	.on('click', regionClick)
	.on('mouseover', regionMouseOver)
	.on('mouseout', regionMouseOut)

	# Misc. properties
	region.id = id
	region.faction = 'ns'
	region.facility = null
	region.style = ps2maps.styles.regions.ns.default

	# Set the region name
	if continent.facilities[value.facility_id]
		region.name = continent.facilities[value.facility_id].name

	# Method for setting the region's faction
	region.setFaction = (faction, animate) ->

		this.faction = faction;

		# If region is connected to the warpgate
		if this.facility.isLinked()
			this.style = ps2maps.styles.regions[this.faction].default
		else
			this.style = ps2maps.styles.regions[this.faction].dark

		if animate == true
			d3.select(this._path)
				.transition().duration(500).attr({fill: '#FFFFFF', 'fill-opacity': 1})
				.transition().duration(1000).attr({fill: this.style.fillColor, 'fill-opacity': this.style.fillOpacity})
		else
			this.setStyle(this.style)

	region.addTo(ps2maps.map)
	ps2maps.regions[id] = region

	# Create regions with no fill color
	options = jQuery.extend({}, ps2maps.styles.regions.ns.default)
	options.pane = 'regionsNoColorPane'
	L.polygon(value.points, options).addTo(ps2maps.map)

# ps2maps.regionsLayerGroup = L.layerGroup(regions).addTo(ps2maps.map)
ps2maps.map.getPane('regionsPane').getRenderer().options.padding = 0.85
ps2maps.map.getPane('regionsNoColorPane').getRenderer().options.padding = 0.85
