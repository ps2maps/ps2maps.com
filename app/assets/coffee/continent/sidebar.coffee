dataset = [0,0,0]
factions = ['vs','tr','nc']

w = 150
h = 150
paddingTop = 15
paddingBottom = 15
strokeWidth = 2

xScale = d3.scale.ordinal()
	.domain(d3.range(dataset.length))
		.rangeRoundBands([0, w], 0.15)

yScale = d3.scale.linear()
	.domain([0, 100])
	.range([0, h-paddingTop-paddingBottom])

svg = d3.select('.sidebar .territory-control .chart')
	.append('svg')
	.attr('width', w)
	.attr('height', h)

defs = svg.append('svg:defs')
percentageTextContainer = svg.append('g')
# factionLogosContainer = svg.append('g')
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

	# Faction Logos
	# logos = factionLogosContainer.selectAll('image').data(data)

	# logos.enter().append('image')
	# 	.attr('x', (d,i) ->
	# 		return xScale(i) + xScale.rangeBand()/2
	# 	)
	# 	.attr('y', (d) ->
	# 		return h
	# 	)
	# 	.attr('xlink:href', (d,i) ->
	# 		return "/img/sprites.svg#" + factions[i] + "_logo"
	# 	)
	# 	.attr('width', '10')
	# 	.attr('height', '10')

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
			# svg = "<svg viewBox='0 0 256 256'><use xlink:href='#" + factions[i] + "_logo'></use></svg>"
			# return svg
			return factions[i].toUpperCase()
		)
		.attr('text-anchor', 'middle')
		.attr('fill', (d,i) ->
			return colors[factions[i]].default
		)

	return

# Init the chart
window.updateTerritoryChart(dataset)
