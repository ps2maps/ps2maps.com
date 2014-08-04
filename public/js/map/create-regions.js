// Create Regions
(function(){

	var regionClick = function(e)
	{

	};

	var regionMouseOver = function(e)
	{
		e.target.bringToFront().setStyle({weight:3, color: '#FFF', fillColor: this.style.fillColor });
	};

	var regionMouseOut = function(e)
	{
		e.target.setStyle(e.target.style);
	};

	// Region styles
	ps2maps.styles = {
		regions: {
			ns: {
				default: {
					weight: 1.2,
					color: '#000',
					opacity: 1,
					fillOpacity: 0,
					pane: 'regionsPane'
				},
				hover: {
					color: '#EEE',
					weight: 3,
					opacity: 1,
					fillOpacity: 0
				}
			},
			nc: {
				default: {
					weight: 1.2,
					fillColor: 'hsl(204,100%,60%)',
					fillOpacity: 0.4,
					color: '#000'
				},
				default_hover: {
					weight: 3,
					fillColor: 'hsl(204,100%,60%)',
					color: '#EEE'
				},
				dark: {
					weight: 1.2,
					fillColor: 'hsl(204,100%,30%)',
					fillOpacity: 0.7,
					color: '#000'
				},
				dark_hover: {
					weight: 3,
					fillColor: 'hsl(204,100%,30%)',
					color: '#EEE'
				}
			},
			tr: {
				default: {
					weight: 1.2,
					fillColor: 'hsl(0,75%,50%)',
					fillOpacity: 0.4,
					color: '#000'
				},
				default_hover: {
					weight: 3,
					fillColor: 'hsl(0,75%,50%)',
					color: '#EEE'
				},
				dark: {
					weight: 1.2,
					fillColor: 'hsl(0,75%,27%)',
					fillOpacity: 0.7,
					color: '#000'
				},
				dark_hover: {
					weight: 3,
					fillColor: 'hsl(0,75%,27%)',
					color: '#EEE'
				}
			},
			vs: {
				default: {
					weight: 1.2,
					fillColor: 'hsl(272,70%,60%)',
					fillOpacity: 0.4,
					color: '#000'
				},
				default_hover: {
					weight: 3,
					fillColor: 'hsl(272,70%,60%)',
					color: '#EEE'
				},
				dark: {
					weight: 1.2,
					fillColor: 'hsl(272,70%,30%)',
					fillOpacity: 0.7,
					color: '#000'
				},
				dark_hover: {
					weight: 3,
					fillColor: 'hsl(272,70%,30%)',
					color: '#EEE'
				}
			}
		}
	};

	ps2maps.regions = {};
	var regions = [], region;

	for( var id in continent.regions )
	{
		region = L.polygon( continent.regions[id].points, ps2maps.styles.regions.ns.default )
			.on('click', regionClick)
			.on('mouseover', regionMouseOver)
			.on('mouseout', regionMouseOut);
		region.id = id;
		region.faction = 'ns';
		region.facility = null;
		region.style = ps2maps.styles.regions.ns.default;

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
					this.style = ps2maps.styles.regions[this.faction].default;
				} else {
					this.style = ps2maps.styles.regions[this.faction].dark;
				}

			} else {
				this.faction = faction;
				this.style = ps2maps.styles.regions[this.faction].default;
			}

			if ( animate == true ) {
				d3.select(this._path)
					.transition().duration(500).attr({fill: '#FFFFFF', 'fill-opacity': 1})
					.transition().duration(1000).attr({fill: this.style.fillColor, 'fill-opacity': this.style.fillOpacity});
			} else {
				this.setStyle(this.style);
			}
		}

		region.addTo(ps2maps.map);
		ps2maps.regions[id] = region;
	}
})();
