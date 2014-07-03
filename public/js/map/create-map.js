// Custom Projection
L.Projection.LatLon = {
	project: function (latlng) {
		return new L.Point(latlng.lat, latlng.lng);
	},
	unproject: function (point) {
		return new L.LatLng(point.x, point.y);
	}
};

// Custom CRS
L.CRS.InvertedCartesian = L.extend({}, L.CRS, {
	projection: L.Projection.LatLon,
	transformation: new L.Transformation(1, 0, 1, 0),
	scale: function (zoom) {
		return Math.pow(2, zoom);
	}
});

// Map Creation
tileUrl = tilesCdn + "/tiles/" + continent.slug + "/" + tileVersion + "/zoom{z}/tile_{z}_{x}_{y}.jpg";
ps2maps.map = L.map('map',
{
	crs: L.CRS.InvertedCartesian,
	minZoom: 1,
	maxZoom: 7,
	attributionControl: false,
	layers: [
		L.tileLayer(tileUrl,
		{
			noWrap: true,
			subdomains: '0123'
		})
	]
}).setView([defaultView.lat,defaultView.lng], defaultView.zoom);

