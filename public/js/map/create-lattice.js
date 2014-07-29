// Create Lattice Links
(function(){

	// Lattice object
	var latticeLink = function(facilityA, facilityB)
	{
		this._facilityA = facilityA;
		this._facilityB = facilityB;
		this.facilities = [];
		this.facilities[facilityA.id] = facilityA;
		this.facilities[facilityB.id] = facilityB;
		this.faction = 'ns';

		var options = {
			pane: 'latticePane'
		};

		this._options = {
			ns: {
				line: {
					color: '#79e0e1',
					pane: 'latticePane',
					weight: 2,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					pane: 'latticePane',
					weight: 4,
					clickable: false
				}
			},
			nc: {
				line: {
					color: factionColors.nc,
					pane: 'latticePane',
					weight: 2,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					pane: 'latticePane',
					weight: 4,
					clickable: false
				}
			},
			tr: {
				line: {
					color: factionColors.tr,
					pane: 'latticePane',
					weight: 2,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					pane: 'latticePane',
					weight: 4,
					clickable: false
				}
			},
			vs: {
				line: {
					color: factionColors.vs,
					pane: 'latticePane',
					weight: 2,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					pane: 'latticePane',
					weight: 4,
					clickable: false
				}
			},
			contested: {
				line: {
					color: '#FFFF00',
					pane: 'latticePane',
					weight: 3,
					clickable: false,
					dashArray: [3,6]
				},
				outline: {
					color: '#000',
					pane: 'latticePane',
					weight: 5,
					clickable: false
				}
			}
		};

		// Draw the line and outline
		var points = [this._facilityA.getLatLng(), this._facilityB.getLatLng()];
		this._outline = L.polyline(points, this._options.ns.outline).addTo(ps2maps.map);
		this._line = L.polyline(points, this._options.ns.line).addTo(ps2maps.map);

		this.setFaction = function()
		{
			var faction;
			if ( this._facilityA.faction == this._facilityB.faction ) {
				this.faction = this._facilityA.faction;
			} else {
				this.faction = 'contested';
			}
			this._outline.setStyle(this._options[this.faction].outline);
			this._line.setStyle(this._options[this.faction].line);
		};
	}

	var points,
		lattice;
	ps2maps.lattice = [];
	// Iterate through the facilities
	for( var type in continent.markers.facilities ) {
		for( var id in continent.markers.facilities[type] ) {
			// Create lattice links for all linked facilities
			if ( continent.markers.facilities[type][id].links ) {
				for( var index in continent.markers.facilities[type][id].links ) {
					ps2maps.lattice.push(new latticeLink(ps2maps.facilities[id], ps2maps.facilities[continent.markers.facilities[type][id].links[index]]));
				}
			}
		}
	}

})();
