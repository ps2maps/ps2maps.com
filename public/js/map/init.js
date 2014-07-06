// Ps2maps Class
function Ps2maps()
{
	this.layers = {};
	this.styles = {};
	this.defaultView = {
		lat: 128,
		lng: 128,
		zoom: 2
	};
	this.options = {
		'regions' : {
			'default' :  {
				weight: 1.2,
				color: '#000',
				opacity: 1,
				fillOpacity: 0
			}
		}
	};
};

// Region On Click Handler
Ps2maps.prototype.regionClick = function(e)
{

};

// Region Mouse Over Handler
Ps2maps.prototype.regionMouseOver = function(e)
{

};

// Region Mouse Out Handler
Ps2maps.prototype.regionMouseOut = function(e)
{

};

// Map Move/Zoom Handler
Ps2maps.prototype.mapMoveZoom = function(e)
{
	var center = this.map.getCenter();
	history.replaceState(null, null, continent.slug+'#'+center.lat+','+center.lng+','+this.map.getZoom()+'z');
};

var ps2maps = new Ps2maps();
