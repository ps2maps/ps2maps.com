# dataset = [0,0,0]

w = 768
h = 768

continentslug = 'amerish'

# d3.select('#amerish-chart').append("svg")
# 	.attr("width", '100%')
# 	.attr("height", '100%')
# 	.attr('viewBox','0 0 ' + w + ' ' + h)


# window.updateTerritoryCharts = (data) ->

dataset = [
	{ label: 'nc', value: 10, color: 'blue' }
	{ label: 'tr', value: 40, color: 'red' }
	{ label: 'vs', value: 50, color: 'purple' }
]

# Donut chart example
# nv.addGraph( () ->
# 	chart = nv.models.pieChart()
# 		.x( (d) -> return d.label )
# 		.y( (d) -> return d.value )
# 		.color( (d) -> return d.data.color  )
# 		.showLabels(true)
# 		.labelThreshold(.05)
# 		.labelType("percent")
# 		.donut(true)
# 		.donutRatio(0.35)
# 		.showLegend(false)

# 	d3.select('#amerish-chart svg')
# 		.datum(dataset)
# 		.transition().duration(350)
# 		.call(chart)

# 	return chart
# )
#

radius = w/2*.8
donutRatio = 0.65
radiusHover = 1.05
donutRatioHover = donutRatio*0.9

# The Pie layout
pie = d3.layout.pie()
	.sort(null)
	.value( (d) -> return d.value )

# The arc size
arc = d3.svg.arc()
	.innerRadius(radius*donutRatio)
	.outerRadius(radius)

# The hover arc size
arcHover = d3.svg.arc()
	.innerRadius(radius*donutRatioHover)
	.outerRadius(radius*radiusHover)

svg = d3.select('#amerish-chart')
	.data([dataset])
	.append('svg:svg')
	.attr('viewBox', '0 0 ' + w + ' ' + h)
	.attr('width','100%')
	.attr('height','100%')
	.attr('preserveAspectRatio','xMidYMid meet')
	.append('svg:g')
	.attr("transform", "translate(" + w/2 + "," + w/2 + ")")

paths = svg.selectAll('path')
	.data(pie)
	.enter()
	.append('svg:path')
	.attr('fill', (d) -> return d.data.color)
	.attr('stroke','#FFF')
	.attr('stroke-width', 4)
	.attr('d',arc)
	.each( (d) -> this._current = d )
	.on('mouseover', (d) ->
		d3.select(this).transition().duration(250).attr('d', arcHover);
		text.text(d.data.value + '%');
	)
	.on('mouseout', (d) ->
		d3.select(this).transition().duration(250).attr('d', arc);
		text.text('');
	)

text = svg
	.append('svg:text')
	.attr('id','territoryChartText')
	.attr('transform', "translate(0,8)")
	.attr('text-anchor', 'middle')
	.attr("font-size", "60px")
	.attr('fill','#FFF');
