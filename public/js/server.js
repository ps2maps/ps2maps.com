var maps = $('.map');

// jQuery
$(function() {
	$(window).on('resize', function(){
		maps.height( maps.width() );
	}).trigger('resize');
});

// Continent Territories
(function() {
	var w = 768, h = 768;
	for( i in continents ) {
		var paper = Raphael(continents[i]+'-map',w,h);
		paper.setViewBox(0,0,w,h,true);
		paper.setSize('100%', '100%');
		paper.image('/img/' + continents[i] + '.jpg',0,0,w,h);
		paper.setStart();
		for( i in territory_data ) {
			var data = territory_data[i];
			var string = "M" + data.points[0][0] + "," + data.points[0][1];
			for( var c=1; c < data.points.length; c++ ) {
				string += "L" + data.points[c][0] + "," + data.points[c][1];
			}
			string += "z";

			var path = paper.path(string);
			path.attr('fill','red');
			path.attr('fill-opacity', '0.5');
			path.attr('stroke', '#FFF');
		}
		var set = paper.setFinish();
		var offset = {
			'tx': 8,
			'ty': 8,
			'r': 0,
			'sx': 2.88,
			'sy': 2.88
		}
		set.transform("T" + offset.tx + "," + offset.ty + "R" + offset.r + "S" + offset.sx + "," + offset.sy + ",0,0");
	}
})();

// Territory Bar
var barCharts = (function(){

	for( i in continents ) {

		data = [ { value:20, color: 'hsl(204,100%,60%)'}, { value:15, color: 'hsl(0,75%,50%)'}, { value:65, color: 'hsl(272,70%,60%)'} ];

		var width = 548, height = 50;

		var chart = d3.select('.bar-chart.' + continents[i])
		.attr("viewBox", "0 0 " + width + " " + height)
		.attr("preserveAspectRatio", "xMidYMid meet")
		.attr('width', '100%')
		.attr('height',height);

		update = function update(data)
		{
			var bar = chart.selectAll('g')
			.data(data, function(d,i){ return d.color; });

			bar.exit().remove();

			// Enter
			var barEnter = bar.enter().append('g');

			barEnter.append('rect')
				.style('fill',function(d,i){
					return d.color;
				})
				.attr('height','100%')
				.attr('width', function(d){ return d.value/100*width - 2 })
				.attr('transform', function(d,i){
					var x = 0;
					for( c=0; c<i; c++) {
						x += data[c].value/100*width + 1;
					}
					return "translate(" + x + ",0)";
				});

			barEnter.append('text')
				.attr('y', '50%' )
				.attr('dy', '.35em')
				.attr('x', function(d,i){
					var x = 0;
					for( c=0; c<i; c++) {
						x += data[c].value/100*width;
					}
					return x + d.value/100*width/2
				})
				.text(function(d,i){ return d.value + "%"; });


			bar.select('rect').transition().duration(1000)
				.attr('width', function(d){ return d.value/100*width - 2 })
				.attr('transform', function(d,i){
					var x = 0;
					for( c=0; c<i; c++) {
						x += data[c].value/100*width + 1;
					}
					return "translate(" + x+ ",0)";
				});

			bar.select('text').transition().duration(1000)
				.attr('x', function(d,i){
					var x = 0;
					for( c=0; c<i; c++) {
						x += data[c].value/100*width;
					}
					return x + d.value/100*width/2
				})
				.text(function(d,i){ return d.value + "%"; });
		}
		update(data);
	}

});
