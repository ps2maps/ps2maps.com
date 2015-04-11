# Custom Projection
L.Projection.LatLon =
	project: (latlng) ->
		new L.Point(latlng.lat, latlng.lng)
	unproject: (point) ->
		new L.LatLng(point.x, point.y)
	bounds: L.bounds([0,0],[256,256])

# Custom CRS
L.CRS.Screen = L.extend({}, L.CRS, {
	projection: L.Projection.LatLon
	transformation: new L.Transformation(1, 0, 1, 0)
	scale: (zoom) ->
		Math.pow(2, zoom)
	wrapLat: null
	wrapLng: null
})

# Create Map
mapOptions =
	crs: L.CRS.Screen
	minZoom: 0
	maxZoom: 10
	maxNativeZoom: 5
	attributionControl: false

ps2maps.map = L.map('map', mapOptions)
# Prevent Right-click context menu
# .on('contextmenu', function(e){})

# Add Tile Layer
tilesUrl = tilesCdn + "/tiles/" + continent.slug + "/latest/zoom{z}/tile_{z}_{x}_{y}.jpg";
layerOptions =
	subdomains: '0123'
	noWrap: true
	continuousWorld: true
	minZoom: mapOptions.minZoom
	maxZoom: mapOptions.maxZoom
	maxNativeZoom: 5
L.tileLayer(tilesUrl, layerOptions).addTo(ps2maps.map)

# Determine map view from URI hash
view = window.location.hash.slice(1,-1).split(',')
if view[0] and view[1] and view[2]
	lat = view[0]
	lng = view[1]
	zoom = view[2]
	# Set the view based on the hash coordinates & zoom
	ps2maps.map.setView([lat,lng],zoom)
else
	# Otherwise zoom map to fit browser
	ps2maps.map.fitBounds([[0,0],[256,256]])

mapMoveZoom = (e) ->
	center = this.map.getCenter()
	window.history.replaceState(null, null, continent.slug + '#'+center.lat+","+center.lng+','+this.map.getZoom()+'z')
	return true
ps2maps.map.on('moveend', mapMoveZoom.bind(ps2maps))

# Map event handlers
mapZoom = (e) ->
	$('.leaflet-map-pane').attr('data-zoom',e.target._zoom)
	return true;

ps2maps.map.on('zoomend', mapZoom.bind(ps2maps)).fireEvent('zoomend')

# Zoom map to facility
ps2maps.viewFacility = (id) ->
	this.map.setView(ps2maps.facilities[id].getLatLng(), 5)
