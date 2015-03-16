# Territory Control Chart Update
$$('body').on('mapUpdated', ->

	for id,continent of continents

		# # Tally up owned territories
		# # Start at -1 because Warpgates don't count
		territories = { vs: -1, tr: -1, nc: -1 }
		for id,region of window[continent.slug].regions
			territories[ps2maps.regions[id].faction.slug] += 1

		# Calculate Total number of territories
		total = territories.vs + territories.tr + territories.nc

		# # Convert territory ownership values to percentages
		for faction,territory of territories
			territories[faction] = Math.round(territory/total*100)
			if territories[faction] < 0
				territories[faction] = 0
			else if territories[faction] > 100
				territories[faction] = 100

		# Reorganize object into simple array
		territories = [ territories.vs, territories.nc, territories.tr ]

		# Update the territory chart for continent
		updateTerritoryChart(continent, territories)
)

# Update territory chart
updateTerritoryChart = (continent, data) ->

	# Bar width
	width = (i) ->
		return w*data[i]/100

	# Rect
	rect = continent.chart.selectAll('rect')
		.data(data)

	# Update
	rect.transition()
		.attr('width', (d,i) ->
			return width(i)
		)
		.attr('x', (d,i) ->
			total = 0
			if i > 0
				for c in [1..i] by 1
					total += width(c-1) + padding
			return total
		)

	# Enter
	rect.enter().append('rect')
		.attr('fill', (d,i) ->
			if i == 0
				return colors.vs.default
			if i == 1
				return colors.nc.default
			if i == 2
				return colors.tr.default
		)
		.attr('width', (d,i) ->
			return width(i)
		)
		.attr('height', (d,i) ->
			return h
		)
		.attr('x', (d,i) ->
			total = 0
			if i > 0
				for c in [1..i] by 1
					total += width(c-1) + padding
			return total
		)
		.attr('y', (d,i) ->
			return 0
		)


	# Text
	fontSize = 30
	text = continent.chart.selectAll('text')
		.data(data)

	# Update
	text.transition()
		.text((d,i) ->
			# Don't show text if < 10%
			if d >= 10
				return d + "%"
			else
				return ""
		)
		.attr('x', (d,i) ->
			total = 0
			for c in [0..i] by 1
				if c == i
					total += width(c)/2
				else
					total += width(c) + padding
			return total
		)

	# Enter
	text.enter()
		.append('text')
		.attr('class', 'percentage')
		.text((d,i) ->
			# Don't show text if < 10%
			if d >= 10
				return d + "%"
			else
				return ""
		)
		.attr('x', (d,i) ->
			total = 0
			for c in [0..i] by 1
				if c == i
					total += width(c)/2
				else
					total += width(c) + padding
			return total
		)
		.attr('y', "65%")
		.attr('text-anchor', 'middle')
		.attr('fill', 'white')
		.attr("font-size", fontSize + "px")

# Init charts
for id,continent of continents

	w = 768
	h = 100
	padding = 0;

	# Create the SVG
	continent.chart = d3.select('#' + continent.slug + '-chart')
		.append('svg')
		.attr('viewBox', '0 0 ' + w + ' ' + h)
		.attr('width','100%')
		.attr('height','100%')
		.attr('preserveAspectRatio','xMidYMid meet')

	# Initial Creation
	data = [ 0, 0, 0 ]
	updateTerritoryChart(continent, data)

