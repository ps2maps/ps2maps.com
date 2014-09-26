(function(){
	var dataset = [0,0,0];

	var w = 180;
	var h = 180;
	var paddingTop = 15;
	var strokeWidth = 2;

	var xScale = d3.scale.ordinal()
		.domain(d3.range(dataset.length))
		.rangeRoundBands([0, w], 0.15);

	var yScale = d3.scale.linear()
		.domain([0, 100])
		.range([0, h-paddingTop]);

	var svg = d3.select('.chart')
		.append('svg')
		.attr('width', w)
		.attr('height', h);

	var defs = svg.append('svg:defs');

	window.updateTerritoryChart = function(data) {
		console.log(data);

		var gradient = defs.selectAll('linearGradient')
			.data(data)
			.enter()
			.append("svg:linearGradient")
			.attr("id", function(d,i){
				return "gradient_" + i;
			})
			.attr("x1", "0%")
			.attr("y1", "0%")
			.attr("x2", "0%")
			.attr("y2", "100%")
			.attr("spreadMethod", "pad");
		gradient.append("svg:stop")
			.data(data)
			.attr("offset", "0%")
			.attr("stop-color", function(d,i){
				if ( i == 0 ) {
					return factionColors.vs.default;
				}	else if ( i == 1 ) {
					return factionColors.tr.default;
				} else {
					return factionColors.nc.default;
				}
			})
			.attr("stop-opacity", 1);
		gradient.append("svg:stop")
			.data(data)
			.attr("offset", "100%")
			.attr("stop-color", function(d,i){
				if ( i == 0 ) {
					return factionColors.vs.dark;
				}	else if ( i == 1 ) {
					return factionColors.tr.dark;
				} else {
					return factionColors.nc.dark;
				}
			})
			.attr("stop-opacity", 1);

		// Rect
		var rect = svg.selectAll('rect')
			.data(data);

		// Rect Update
		rect.transition()
			.attr('y', function(d,i){
				return h - yScale(d);
			})
			.attr('height', function(d){
				return yScale(d) - strokeWidth/2;
			});

		// Rect Enter
		rect.enter().append('rect')
			.attr('x', function(d,i){
				return xScale(i);
			})
			.attr('y', function(d,i){
				return h - yScale(d);
			})
			.attr('width', xScale.rangeBand())
			.attr('height', function(d){
				return yScale(d);
			})
			.style("fill", function(d,i){
				return "url(#gradient_" + i + ")";
			})
			.style('stroke', function(d,i){
				if ( i == 0 ) {
					return factionColors.vs.default;
				}	else if ( i == 1 ) {
					return factionColors.tr.default;
				} else {
					return factionColors.nc.default;
				}
			})
			.style('stroke-width', strokeWidth);

		// Text
		var text = svg.selectAll('text')
			.data(data);

		// Text Update
		text.transition()
			.attr('y', function(d){
				return h - yScale(d) - 3;
			})
			.text(function(d,i){
				return d + "%";
			});

		// Text Enter
		text.enter().append('text')
			.attr('x', function(d,i){
				return i * (w/data.length) + (w/data.length - 1)/2;
			})
			.attr('y', function(d){
				return h - yScale(d) - 3;
			})
			.text(function(d,i){
				return d + "%";
			})
			.attr('text-anchor', 'middle')
			.attr('fill', 'white');
	}
	window.updateTerritoryChart(dataset);

	d3.select('button.update').on('click', function(){
		var dataset = [ Math.round(Math.random()*100), Math.round(Math.random()*100), Math.round(Math.random()*100) ];
		window.updateTerritoryChart(dataset);

	});

})();
