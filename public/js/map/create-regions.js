// Create Regions
(function(){

	var regionClick = function(e)
	{

	};

	var regionMouseOver = function(e)
	{
		e.target.bringToFront().setStyle(ps2maps.options.regions.hover);
	};

	var regionMouseOut = function(e)
	{
		e.target.setStyle(ps2maps.options.regions.default);
	};

	ps2maps.regions = {};
	var regions = [], region;

	for( id in continent.regions )
	{
		region = L.polygon( continent.regions[id].points, ps2maps.options.regions.default )
			.on('click', regionClick)
			.on('mouseover', regionMouseOver)
			.on('mouseout', regionMouseOut);
		region.id = id;
		region.name = continent.regions[id].name;
		region.facility = null;
		region.addTo(ps2maps.map);
		ps2maps.regions[id] = region;
	}
})();
