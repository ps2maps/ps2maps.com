// Create Regions
(function(){

	// territories = [];
	var regions = [], region;

	for( index in continent.regions )
	{
		// console.log(ps2maps.options.regions.default);
		region = L.polygon( continent.regions[index].polygon, ps2maps.options.regions.default )
			.on('click', ps2maps.regionClick)
			.on('mouseover', ps2maps.regionMouseOver)
			.on('mouseout', ps2maps.regionMouseOut);
		region.id = continent.regions[index].id;
		region.name = continent.regions[index].name;
		region.addTo(ps2maps.map);
		// region.type_id = continent.regions[index].type_id;
		// region.resource = continent.regions[index].resource;
		// region.markers = [];
		regions.push(region);
		// territories[regions[index].id] = region;
	}
	// L.layerGroup(regions).addTo(ps2maps.map);
	regions = null;
	//territoriesLayer.eachLayer(function(layer){ layer.on('click', function(e){ territoryClick(e) }).on('mouseover', function(e){ territoryOver(e) }).on('mouseout', function(e){ territoryOut(e) }); });
})();
