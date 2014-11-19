class Ps2maps
	defaultView: { lat: 128, lng: 128, zoom: 2 }
	warpgates: {}
	regions: []
	icons: {}
	facilities: {}
	lattice: []

	# Factions
	factions:
		0:
			slug: 'ns'
			name: 'Nanite Systems'
		1:
			slug: 'vs'
			name: 'Vanu Soverignty'
		2:
			slug: 'nc'
			name: 'New Conglomerate'
		3:
			slug: 'tr'
			name: 'Terran Republic'

	factionSlugs:
		ns:
			id: 0
			name: 'Nanite Systems'
		vs:
			id: 1
			name: 'Vanu Soverignty'
		nc:
			id: 2
			name: 'New Conglomerate'
		tr:
			id: 3
			name: 'Terran Republic'

	# Facility types
	facilityTypes:
		amp_station:
			name: "Amp Station"
			id: 2
		bio_lab:
			name: "Bio Lab"
			id: 3
		tech_plant:
			name: "Tech Plant"
			id: 4
		warpgate:
			name: "Warpgate"
			id: 7
		interlink_facility:
			name: "Interlink Facility"
			id: 8
		large_outpost:
			name: "Large Outpost"
			id: 5
		small_outpost:
			name: "Small Outpost"
			id: 6

	# Region styles
	styles :
		regions:
			ns:
				default:
					weight: 1.2
					color: '#000'
					opacity: 1
					fillOpacity: 0
					pane: 'regions'
				hover:
					color: '#EEE'
					weight: 3
					opacity: 1
					fillOpacity: 0
			vs:
				default:
					weight: 1.2
					fillColor: colors.vs.default
					fillOpacity: 0.4
					color: '#000'
				default_hover:
					weight: 3
					fillColor: colors.vs.default
					color: '#EEE'
				dark:
					weight: 1.2
					fillColor: colors.vs.dark
					fillOpacity: 0.7
					color: '#000'
				dark_hover:
					weight: 3
					fillColor: colors.vs.dark
					color: '#EEE'
			nc:
				default:
					weight: 1.2
					fillColor: colors.nc.default
					fillOpacity: 0.4
					color: '#000'
				default_hover:
					weight: 3
					fillColor: colors.nc.default
					color: '#EEE'
				dark:
					weight: 1.2
					fillColor: colors.nc.dark
					fillOpacity: 0.7
					color: '#000'
				dark_hover:
					weight: 3
					fillColor: colors.nc.dark
					color: '#EEE'
			tr:
				default:
					weight: 1.2
					fillColor: colors.tr.default
					fillOpacity: 0.4
					color: '#000'
				default_hover:
					weight: 3
					fillColor: colors.tr.default
					color: '#EEE'
				dark:
					weight: 1.2
					fillColor: colors.tr.dark
					fillOpacity: 0.7
					color: '#000'
				dark_hover:
					weight: 3
					fillColor: colors.tr.dark
					color: '#EEE'

	# pageVisibilityChange: ->
	# 	if ( pageIsVisible() )
	# 		console.log("the page is visible");

window.ps2maps = new Ps2maps()
