
// Faction Data
var factions = {
	0: {
		id: 0,
		name: 'Neutral',
		code: 'ns',
		defaultStyle: {
			fillColor: '#ffffff',
			fillOpacity: 0,
		},
		hoverStyle: {
			fillColor: '#ffffff'
		}
	},
	1: {
		id: 1,
		name: 'Vanu Sovereignty',
		code: 'vs',
		defaultStyle: {
			fillColor: '#6600FF',
			fillOpacity: 0.5
		},
		hoverStyle: {
			fillColor: '#3300FF'
		}
	},
	2: {
		id: 2,
		name: 'New Conglomerate',
		code: 'nc',
		defaultStyle: {
			fillColor: '#0066FF',
			fillOpacity: 0.5
		},
		hoverStyle: {
			fillColor: '#0033FF'
		}
	},
	3: {
		id: 3,
		name: 'Terran Republic',
		code: 'tr',
		defaultStyle: {
			fillColor: '#FF0000',
			fillOpacity: 0.5,
		},
		hoverStyle: {
			fillColor: '#CC0000'
		}
	}
};

function fetchTerritoryControl()
{
	var data = { server_slug: server.slug };

	$.post('/ajax/territory-control', data, function(){}, 'json')
	.done(function(response)
	{
		if ( response )
		{
			// Territory Info Panel
			var territoryId = $('#territory-info').attr('data-territory-id');

			// Update Each Territory
			layers.territories.layerGroup.eachLayer(function(layer)
			{
				var faction_id = response.regions[layer.id].faction_id;
				if ( !layer.faction || layer.faction.id != faction_id )
				{
					layer.faction = factions[faction_id];
					layer.timestamp = response.regions[layer.id].timestamp;
					layer.setStyle( factions[faction_id].defaultStyle );
				}

				// Update Territory Info Panel
				if ( layer.id == territoryId )
				{
					layer.fireEvent('click');
				}
			});

			_gaq.push(['_trackEvent', 'ajax', 'territoryControl', server.name, continent.name]);
		}
	});
}

$(document).ready(function()
{
	data = [
		30,
		40,
		10
	];

	svg = d3.select('#amerish_territoryControl')
		.data([amerish])
		.append('svg:svg')
		.attr('width','100%')
		.attr('height',100)
		.append('svg:g');




});

