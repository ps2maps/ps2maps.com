class LatticeLink

	constructor: (facilityA, facilityB) ->
		this._facilityA = facilityA
		this._facilityB = facilityB
		this.facilities = {}
		this.facilities[facilityA.id] = facilityA
		this.facilities[facilityB.id] = facilityB
		this.faction = 'ns'

		# Draw the line and outline
		points = [this._facilityA.getLatLng(), this._facilityB.getLatLng()]
		this.outline = L.polyline(points, this.colors.ns.outline).addTo(ps2maps.map)
		this.line = L.polyline(points, this.colors.ns.line).addTo(ps2maps.map)

		return true

	options:
		pane: 'latticePane'

	colors:
		ns:
			line:
				color: colors.ns.default
				pane: 'latticePane'
				weight: 2
				clickable: false
				dashArray: null
			outline:
				color: '#FFF'
				pane: 'latticePane'
				weight: 4
				clickable: false
		nc:
			line:
				color: colors.nc.default
				pane: 'latticePane'
				weight: 2
				clickable: false
				dashArray: null
			outline:
				color: '#FFF'
				pane: 'latticePane'
				weight: 4
				clickable: false
		tr:
			line:
				color: colors.tr.default
				pane: 'latticePane'
				weight: 2
				clickable: false
				dashArray: null
			outline:
				color: '#FFF'
				pane: 'latticePane'
				weight: 4
				clickable: false
		vs:
			line:
				color: colors.vs.default
				pane: 'latticePane'
				weight: 2
				clickable: false
				dashArray: null
			outline:
				color: '#FFF'
				pane: 'latticePane'
				weight: 4
				clickable: false
		contested:
			line:
				color: '#FFFF00'
				pane: 'latticePane'
				weight: 3
				clickable: false
				dashArray: [6]
			outline:
				color: '#000'
				pane: 'latticePane'
				weight: 5
				clickable: false

	setFaction: () ->
		if this._facilityA.faction == this._facilityB.faction
			this.faction = this._facilityA.faction
		else
			this.faction = 'contested'
		this.outline.setStyle(this.colors[this.faction].outline)
		this.line.setStyle(this.colors[this.faction].line)

# Loop through the facility types
for facility_type,facilities of continent.facilities

	# Loop through the facilties
	for id,facility of facilities

		# If facility has links
		if facility.links

			# Loop through the links
			for link in facility.links

				# Link this facility with the linked facility
				ps2maps.lattice.push(new LatticeLink(ps2maps.facilities[id], ps2maps.facilities[link]))

ps2maps.map.getPane('latticePane').getRenderer().options.padding = 0.75
