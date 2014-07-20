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

		this._styles = {
			ns: {
				line: {
					color: '#79e0e1',
					weight: 4,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					weight: 6,
					clickable: false
				}
			},
			nc: {
				line: {
					color: '#33ADFF',
					weight: 5,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					weight: 7,
					clickable: false
				}
			},
			tr: {
				line: {
					color: '#DF2020',
					weight: 5,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					weight: 7,
					clickable: false
				}
			},
			vs: {
				line: {
					color: '#9E52E0',
					weight: 5,
					clickable: false,
					dashArray: null
				},
				outline: {
					color: '#FFF',
					weight: 7,
					clickable: false
				}
			},
			contested: {
				line: {
					color: '#FFFF00',
					weight: 5,
					clickable: false,
					dashArray: [1,6]
				},
				outline: {
					color: '#000',
					weight: 6,
					clickable: false
				}
			}
		};

		// Draw the line and outline
		var points = [this._facilityA.getLatLng(), this._facilityB.getLatLng()];
		this._outline = L.polyline(points, this._styles.ns.outline).addTo(ps2maps.map);
		this._line = L.polyline(points, this._styles.ns.line).addTo(ps2maps.map);

		this.setFaction = function(faction)
		{
			this._outline.setStyle(this._styles[faction].outline);
			this._line.setStyle(this._styles[faction].line);
		};
	}

	var points,
		lattice;
	ps2maps.lattice = [];
	// Iterate through the facilities
	for( type in continent.markers.facilities ) {
		for( id in continent.markers.facilities[type] ) {
			// Create lattice links for all linked facilities
			if ( continent.markers.facilities[type][id].links ) {
				for( index in continent.markers.facilities[type][id].links ) {
					ps2maps.lattice.push(new latticeLink(ps2maps.facilities[id], ps2maps.facilities[continent.markers.facilities[type][id].links[index]]));
				}
			}
		}
	}

})();
