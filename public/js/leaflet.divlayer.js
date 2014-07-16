/*
 Copyright (c) 2013-2014 Jake Wilson
 Leaflet.DivLayer is a Leaflet plugin that allows creation of arbitrary div elements on the map
 https://github.com/jakobud
*/

L.DivLayer = L.Layer.extend({

	options: {
		className: 'leaflet-divlayer',
		pane: 'markerPane',
		html: ""
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
		this.style = this._container.style;

		this._updateContent();

		// Add to map pane
		this._pane = map.getPane(this.options.pane);
		this._pane.appendChild(this._container);

		// add a viewreset event listener for updating layer's position, do the latter
		map.on('viewreset', this._reset, this);
		this._reset();

		// Zoom Animation
		if (L.Browser.any3d) {
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
		// remove layer's DOM elements and listeners
		map.getPanes().markerPane.removeChild(this._container);
		map.off('viewreset', this._reset, this);
	},

	setHtml: function(html)
	{
		this.options.html = html;
		this._updateContent();
	},

	getContainer: function()
	{
		return this._container;
	},

	_updateContent: function()
	{
		if (!this.options.html) {
			return;
		}

		// Set the container content
		if (typeof this.options.html === 'string')	{
			this._container.innerHTML = this.options.html;
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

L.divLayer = function (map, name, container) {
	return new L.DivLayer(map, name, container);
};


