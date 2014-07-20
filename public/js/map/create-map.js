(function(){

	// Custom Projection
	L.Projection.LatLon = {
		project: function (latlng) {
			return new L.Point(latlng.lat, latlng.lng);
		},
		unproject: function (point) {
			return new L.LatLng(point.x, point.y);
		},
		bounds: L.bounds([0,0],[256,256])
	};

	// Custom CRS
	L.CRS.Screen = L.extend({}, L.CRS, {
		projection: L.Projection.LatLon,
		transformation: new L.Transformation(1, 0, 1, 0),
		scale: function (zoom) {
			return Math.pow(2, zoom);
		},
		wrapLat: null,
		wrapLng: null
	});

	// Map Creation
	ps2maps.map = L.map('map',
	{
		crs: L.CRS.Screen,
		minZoom: 1,
		maxZoom: 7,
		attributionControl: false,
	})
	// Prevent Right-click context menu
	// .on('contextmenu', function(e){});

	// Tile Layer
	var tilesUrl = tilesCdn + "/tiles/" + continent.slug + tileVersion + "/zoom{z}/tile_{z}_{x}_{y}.jpg";
	L.tileLayer(tilesUrl, {
		subdomains: '0123',
		noWrap: true,
		continuousWorld: true
	}).addTo(ps2maps.map);

	/* Canvas Tiles (for debugging)
	var canvasTiles = L.tileLayer.canvas({
	    minZoom: 0,
	    maxZoom: 16,
	    attribution: 'Map data &copy; FooBar',
	    continuousWorld: true,
	    tms: true
	});
	canvasTiles.drawTile = function(canvas, point, zoom) {
	    var context = canvas.getContext('2d');
	    context.beginPath();
	    context.rect(0, 0, 256, 256);
	    context.lineWidth = 2;
	    context.strokeStyle = 'white';
	    context.stroke();
	    context.font="20px Arial";
	    context.fillStyle = 'white';
	    context.fillText("x:" + point.x + " y:" + point.y + " z:" + zoom, 80, 140);
	}
	canvasTiles.addTo(ps2maps.map);
	*/

	// Set view to either default view or use url hash
	var lat, lng, zoom, view = window.location.hash.slice(1,-1).split(',');
	// Do values exist and are they valid numbers?
	if ( view[0] && view[1] && view[2] && !isNaN(view[0]) && !isNaN(view[1]) && !isNaN(view[2]) ) {
		lat = view[0];
		lng = view[1];
		zoom = view[2];
	} else { // Use default values
		lat = ps2maps.defaultView.lat;
		lng = ps2maps.defaultView.lng;
		zoom = ps2maps.defaultView.zoom;
	}

	// Set the view
	ps2maps.map.setView([lat,lng],zoom);

	// Set the move & zoom handler
	// Do this after setting intial view or else URL is appended with default view hash
	var mapMoveZoom = function(e)
	{
		var center = this.map.getCenter();
		history.replaceState(null, null, continent.slug+'#'+center.lat+','+center.lng+','+this.map.getZoom()+'z');
	};
	ps2maps.map.on('moveend', mapMoveZoom.bind(ps2maps));

	// var mapZoom = function(e)
	// {
	// 	console.log(e);
	// };
	// ps2maps.map.on('zoomend', mapZoom.bind(ps2maps)).fireEvent('zoomend');
})();
