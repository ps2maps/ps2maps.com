/*
 Copyright (c) 2013, Gunsight Labs, Jake Wilson
 Leaflet.DivLayer is a Leaflet plugin that allows creation of arbitrary div elements on the map
 https://github.com/jakobud
*/

L.DivLayer = L.Class.extend({

	options: {
		className: 'leaflet-divlayer'
	},

	initialize: function (latlng, options)
	{
		L.setOptions(this, options);
		this._latlng = latlng;
	},

	onAdd: function (map)
	{
		this._map = map;

		// create a DOM element
		this._container = L.DomUtil.create('div', this.options.className + ' leaflet-zoom-animated');

		this._updateContent();

		// Add to map pane
		map.getPanes().markerPane.appendChild(this._container);

		// add a viewreset event listener for updating layer's position, do the latter
		map.on('viewreset', this._reset, this);
		this._reset();

		// Zoom Animation
		if (L.Browser.any3d)
		{
			map.on('zoomanim', this._zoomAnimation, this);
		}
	},

	addTo: function (map)
	{
		map.addLayer(this);
		return this;
	},

	onRemove: function (map)
	{
		// console.log(map, map.getPanes(), map.getPanes().overlayPane, this._container);

		// // remove layer's DOM elements and listeners
		map.getPanes().markerPane.removeChild(this._container);
		map.off('viewreset', this._reset, this);
	},

	setContent: function(content)
	{
		this.options.content = content;
		this._updateContent();
	},

	_updateContent: function()
	{
		if ( !this.options.content )
		{
			return;
		}

		// Set the container content
		if ( typeof this.options.content === 'string' )
		{
			this._container.innerHTML = this.options.content;
		}

		// Set the css
		if ( this.options.css )
		{
			this._setCss(this.options.css);
		}
	},

	_setCss: function(css)
	{
		for(attr in css)
		{
			this._container.style[attr] = css[attr];
		}
	},

	_setPosition: function (pos)
	{
		L.DomUtil.setPosition(this._container, pos);
	},

	_zoomAnimation: function (opt)
	{
		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center);
		this._setPosition(pos);
	},

	_reset: function ()
	{
		// update layer's position
		var pos = this._map.latLngToLayerPoint(this._latlng);
		L.DomUtil.setPosition(this._container, pos);
	}
});



