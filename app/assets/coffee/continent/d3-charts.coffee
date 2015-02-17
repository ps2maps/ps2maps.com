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
	sidebarTerritoryChart.update([territories.vs, territories.tr, territories.nc])
	navMenuTerritoryChart.update([territories.vs, territories.tr, territories.nc])
)

class SidebarTerritoryChart

	factions = ['vs', 'tr', 'nc']

	data = [0,0,0]
	w = 150
	h = 150
	paddingTop = 15
	paddingBottom = 15
	strokeWidth = 2

	xScale = d3
		.scale
		.ordinal()
		.domain(d3.range(data.length))
		.rangeRoundBands([0, w], 0.15)

	yScale = d3
		.scale
		.linear()
		.domain([0, 100])
		.range([0, h - paddingTop - paddingBottom])

	svg = d3.select('.sidebar .territory-control .chart')
		.append('svg')
		.attr('width', w)
		.attr('height', h)

	defs = svg.append('svg:defs')
	percentageTextContainer = svg.append('g')
	factionTextContainer = svg.append('g')

	gradient = defs
		.selectAll('linearGradient')
		.data(data)
		.enter()
		.append("svg:linearGradient")
		.attr("id", (d, i)->
			return "gradient_" + i
		)
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "0%")
		.attr("y2", "100%")
		.attr("spreadMethod", "pad")

	gradient
		.append("svg:stop")
		.data(data)
		.attr("offset", "0%")
		.attr("stop-color", (d, i)->
			if i == 0
				return colors.vs["default"]
			else if i == 1
				return colors.tr["default"]
			else
				return colors.nc["default"]
		)
		.attr("stop-opacity", 1)

	gradient
		.append("svg:stop")
		.data(data)
		.attr("offset", "100%")
		.attr("stop-color", (d, i)->
			if i == 0
				return colors.vs.dark
			else if i == 1
				return colors.tr.dark
			else
				return colors.nc.dark
		)
		.attr("stop-opacity", 1)

	update: (data) ->

		# Rect
		rect = svg.selectAll('rect').data(data)

		# Rect Update
		rect
			.transition()
			.attr('y', (d, i)->

				if d == 1
					offset = 1
				else
					offset = 0

				value = h - yScale(d) - paddingBottom - offset

				return value
			)
			.attr('height', (d)->

				height = yScale(d) - strokeWidth

				if height >= 0
					return height
				else
					return 0
			)

		# Rect Enter
		rect
			.enter()
			.append('rect')
			.attr('x', (d, i)->
				return xScale(i)
			)
			.attr('y', (d, i)->
				return h - yScale(d) - paddingBottom
			)
			.attr('width', xScale.rangeBand())
			.attr('height', (d)->

				height = yScale(d) - strokeWidth
				if height >= 0
					return height
				else
					return 0

			)
			.attr("fill", (d, i)->
				return "url(#gradient_" + i + ")"
			)
			.attr('stroke', (d, i)->
				if i == 0
					return colors.vs["default"]
				else if i == 1
					return colors.tr["default"]
				else
					return colors.nc["default"]

			)
			.attr('stroke-width', strokeWidth)

		# Percentage Text
		percentageText = percentageTextContainer.selectAll('text').data(data)

		# Text Update
		percentageText
			.transition()
			.attr('y', (d)->
				return h - yScale(d) - paddingBottom - 3
			)
			.text((d, i)->
				return d + "%"
			)

		# Text Enter
		percentageText
			.enter()
			.append('text')
			.attr('x', (d, i)->
				return xScale(i) + xScale.rangeBand() / 2
			)
			.attr('y', (d)->
				return h - yScale(d) - paddingBottom - 3
			)
			.text((d, i)->
				return d + "%"
			)
			.attr('text-anchor', 'middle')
			.attr('fill', 'white')

		# Faction text
		factionText = factionTextContainer.selectAll('text').data(data)

		# Enter
		factionText
			.enter()
			.append('text')
			.attr('x', (d, i)->
				return xScale(i) + xScale.rangeBand() / 2
			)
			.attr('y', (d)->
				return h
			)
			.text((d, i)->
				return factions[i].toUpperCase()
			)
			.attr('text-anchor', 'middle')
			.attr('fill', (d, i)->
				return colors[factions[i]]["default"]
			)

class NavMenuTerritoryChart

	data = [0,0,0]
	w = 200
	h = 40
	padding = 0;
	fontSize = 20

	# Create the SVG
	svg = d3.select('#sidebar-wrapper li.continent.current .chart').append('svg')

	svg.attr('viewBox', '0 0 ' + w + ' ' + h)
		.attr('width','100%')
		.attr('height','100%')
		.attr('preserveAspectRatio','xMidYMid meet')

	# defs = svg.append('svg:defs')

	# gradient = defs
	# 	.selectAll('linearGradient')
	# 	.data(data)
	# 	.enter()
	# 	.append("svg:linearGradient")
	# 	.attr("id", (d, i)->
	# 		return "gradient_" + i
	# 	)
	# 	.attr("x1", "0%")
	# 	.attr("y1", "0%")
	# 	.attr("x2", "0%")
	# 	.attr("y2", "100%")
	# 	.attr("spreadMethod", "pad")

	# gradient
	# 	.append("svg:stop")
	# 	.data(data)
	# 	.attr("offset", "0%")
	# 	.attr("stop-color", (d, i)->
	# 		if i == 0
	# 			return colors.vs["default"]
	# 		else if i == 1
	# 			return colors.tr["default"]
	# 		else
	# 			return colors.nc["default"]
	# 	)
	# 	.attr("stop-opacity", 1)

	# gradient
	# 	.append("svg:stop")
	# 	.data(data)
	# 	.attr("offset", "100%")
	# 	.attr("stop-color", (d, i)->
	# 		if i == 0
	# 			return colors.vs.dark
	# 		else if i == 1
	# 			return colors.tr.dark
	# 		else
	# 			return colors.nc.dark
	# 	)
	# 	.attr("stop-opacity", 1)

	update: (data)->

		# Bar width
		width = (i) ->
			return w*data[i]/100

		# Rect
		rect = svg.selectAll('rect')
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
		text = svg.selectAll('text')
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

sidebarTerritoryChart = new SidebarTerritoryChart
sidebarTerritoryChart.update([0,0,0])

navMenuTerritoryChart = new NavMenuTerritoryChart
navMenuTerritoryChart.update([0,0,0])
