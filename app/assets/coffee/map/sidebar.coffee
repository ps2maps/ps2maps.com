dataset = [0,0,0]
factions = ['vs','tr','nc']

w = 190
h = 190
paddingTop = 15
paddingBottom = 15
strokeWidth = 2

xScale = d3.scale.ordinal()
	.domain(d3.range(dataset.length))
		.rangeRoundBands([0, w], 0.15)

yScale = d3.scale.linear()
	.domain([0, 100])
	.range([0, h-paddingTop-paddingBottom])

svg = d3.select('.chart')
	.append('svg')
	.attr('width', w)
	.attr('height', h)

defs = svg.append('svg:defs')
percentageTextContainer = svg.append('g')
factionTextContainer = svg.append('g')

# Create the gradient
gradient = defs.selectAll('linearGradient')
	.data(dataset)
	.enter()
	.append("svg:linearGradient")
	.attr("id", (d,i) ->
		return "gradient_" + i
	)
	.attr("x1", "0%")
	.attr("y1", "0%")
	.attr("x2", "0%")
	.attr("y2", "100%")
	.attr("spreadMethod", "pad")

# Gradient start color
gradient.append("svg:stop")
	.data(dataset)
	.attr("offset", "0%")
	.attr("stop-color", (d,i) ->
		if i == 0
			return colors.vs.default
		else if i == 1
			return colors.tr.default
		else
			return colors.nc.default
	)
	.attr("stop-opacity", 1)

# Gradient end color
gradient.append("svg:stop")
	.data(dataset)
	.attr("offset", "100%")
	.attr("stop-color", (d,i) ->
		if i == 0
			return colors.vs.dark
		else if i == 1
			return colors.tr.dark
		else
			return colors.nc.dark
	)
	.attr("stop-opacity", 1)

window.updateTerritoryChart = (data) ->

	# Rect
	rect = svg.selectAll('rect')
		.data(data)

	# Update
	rect.transition()
		.attr('y', (d,i) ->
			if d == 1
				offset = 1
			else
				offset = 0
			value = h - yScale(d) - paddingBottom - offset
			return value
		)
		.attr('height', (d) ->
			stroke = d == 1 ? 1 : strokeWidth
			height = yScale(d) - stroke
			if height >= 0
				return height
			else
				return 0
		)

	# Enter
	rect.enter().append('rect')
		.attr('x', (d,i) ->
			return xScale(i)
		)
		.attr('y', (d,i) ->
			offset = d == 1 ? 1 : 0
			return h - yScale(d) - paddingBottom - offset
		)
		.attr('width', xScale.rangeBand())
		.attr('height', (d) ->
			stroke = d == 1 ? 1 : strokeWidth
			height = yScale(d) - stroke
			if height >= 0
				return height
			else
				return 0
		)
		.style("fill", (d,i) ->
			return "url(#gradient_" + i + ")"
		)
		.style('stroke', (d,i) ->
			if i == 0
				return colors.vs.default
			else if i == 1
				return colors.tr.default
			else
				return colors.nc.default
		)
		.style('stroke-width', strokeWidth)

	# Percentage Text
	percentageText = percentageTextContainer.selectAll('text')
		.data(data)

	# Update
	percentageText.transition()
		.attr('y', (d) ->
			return h - yScale(d) - paddingBottom - 3
		)
		.text((d,i)->
			return d + "%"
		)

	# Enter
	percentageText.enter().append('text')
		.attr('x', (d,i) ->
			return xScale(i) + xScale.rangeBand()/2
		)
		.attr('y', (d) ->
			return h - yScale(d) - paddingBottom - 3
		)
		.text((d,i) ->
			return d + "%"
		)
		.attr('text-anchor', 'middle')
		.attr('fill', 'white')

	# Faction text
	factionText = factionTextContainer.selectAll('text')
		.data(data)

	# Enter
	factionText.enter().append('text')
		.attr('x', (d,i) ->
			return xScale(i) + xScale.rangeBand()/2
		)
		.attr('y', (d) ->
			return h
		)
		.text((d,i) ->
			return factions[i].toUpperCase()
		)
		.attr('text-anchor', 'middle')
		.attr('fill', (d,i) ->
			return colors[factions[i]].default
		)

	return

window.updateTerritoryChart(dataset)

# Sidebar hide/show
sidebar = $('.sidebar')
$('.sidebar-toggle').on('click', (e) ->
	console.log 'here'
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


# Sidebar Layer Controls

# Terrain / Tiles
$('.control-terrain').on('change', (e) ->
	if $(this).is(':checked')
		$('.leaflet-tile-pane').show()
	else
		$('.leaflet-tile-pane').hide()
)

# Facilities
$('.control-facilities').on('change', (e) ->
	if $(this).is(':checked')
		$('.leaflet-facilities-pane, .leaflet-facilitiesLabels-pane, .leaflet-outposts-pane, .leaflet-outpostsLabels-pane').show()
	else
		$('.leaflet-facilities-pane, .leaflet-facilitiesLabels-pane, .leaflet-outposts-pane, .leaflet-outpostsLabels-pane').hide()
)

# Lattice
$('.control-lattice').on('change', (e) ->
	if $(this).is(':checked')
		$('.leaflet-lattice-pane').show()
	else
		$('.leaflet-lattice-pane').hide()
)

$('.control-regions').on('change', (e) ->
	switch $(this).find('option:selected').val()
		when 'control'
			ps2maps.regionsLayerGroup.eachLayer( (layer)->
				console.log layer
			)
		when 'territories'
			ps2maps.regionsLayerGroup.eachLayer( (layer)->
				console.log layer
			)
		when 'hide'
			ps2maps.regionsLayerGroup.eachLayer( (layer)->
				console.log layer
			)
)

$('.control-grid').on('change', (e) ->

	switch $(this).find('option:selected').val()
		when 'grid'
			$('.leaflet-grid-pane, .leaflet-gridLabels-pane').show()
			$('.leaflet-subGrid-pane').hide()
		when 'both'
			$('.leaflet-grid-pane, .leaflet-gridLabels-pane, .leaflet-subGrid-pane').show()
		when 'hide'
			$('.leaflet-grid-pane, .leaflet-gridLabels-pane, .leaflet-subGrid-pane').hide()
)



