// Create Regions
(function(){

	// Region On Click
	function onClick(e)
	{
		// console.log(e);
	}

	// Region Mouse Over
	function onMouseOver(e)
	{
		// console.log('moused over');
	}

	// Region Mouse Out
	function onMouseOut(e)
	{
		// console.log('moused out');
	}

	// territories = [];
	var regions = [],
		region;

	for( index in continent.regions )
	{
		region = L.polygon( continent.regions[index].polygon, ps2maps.options.regions.default )
			.on('click', onClick)
			.on('mouseover', onMouseOver)
			.on('mouseout', onMouseOut);
			region.id = continent.regions[index].id;
			region.name = continent.regions[index].name;
			// region.type_id = continent.regions[index].type_id;
			// region.resource = continent.regions[index].resource;
			// region.markers = [];
		regions.push(region);
		// territories[regions[index].id] = region;
	}
	ps2maps.layers.regions = L.layerGroup(regions).addTo(ps2maps.map);
	regions = null;
	//territoriesLayer.eachLayer(function(layer){ layer.on('click', function(e){ territoryClick(e) }).on('mouseover', function(e){ territoryOver(e) }).on('mouseout', function(e){ territoryOut(e) }); });
})();
