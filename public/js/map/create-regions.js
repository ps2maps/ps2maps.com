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
		e.target.setStyle(ps2maps.options.regions[e.target.style]);
	};

	ps2maps.regions = {};
	var regions = [], region;

	for( var id in continent.regions )
	{
		region = L.polygon( continent.regions[id].points, ps2maps.options.regions.ns )
			.on('click', regionClick)
			.on('mouseover', regionMouseOver)
			.on('mouseout', regionMouseOut);
		region.id = id;
		region.faction = 'ns';
		region.facility = null;
		region.style = null;

		// Set the region's name
		var facility_id = continent.regions[id].facility_id;
		if ( continent.markers.facilities[facility_id] ) {
			region.name = continent.markers.facilities[continent.regions[id].facility_id].name;
		}

		region.setFaction = function(faction, animate)
		{
			if ( faction == null && this.facility ) {
				this.faction = this.facility.faction;

				if ( this.facility.isConnected() ) {
					this.style = this.faction;
				} else {
					this.style = this.faction + "_dark";
				}

			} else {
				this.faction = this.style = faction;
			}

			if ( animate == true ) {
				d3.select(this._path)
					.transition().duration(500).attr({fill: '#FFFFFF', 'fill-opacity': 1})
					.transition().duration(1000).attr({fill: ps2maps.options.regions[this.style].fillColor, 'fill-opacity': ps2maps.options.regions[this.style].fillOpacity});
			} else {
				this.setStyle(ps2maps.options.regions[this.style]);
			}
		}

		region.addTo(ps2maps.map);
		ps2maps.regions[id] = region;
	}
})();
