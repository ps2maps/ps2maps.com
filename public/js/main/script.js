$(document).ready(function()
{
	// Search Icon
	// $('#navbar-search').on('click', function()
	// {
	// 	$(this).parent().parent().hide().prev().fadeIn().children().first().focus();
	// });

	// Navbar Search Query
	// $('.navbar-search .search-query').typeahead({
	// 	minLength: 1,
	// 	source: function(query, process)
	// 	{
	// 		var data = [];
	// 		this.map = {};
	// 		var object = this;

	// 		// If source data exists...
	// 		if ( this.outposts )
	// 		{
	// 			$.each(this.outposts, function(i, outpost)
	// 			{
	// 				object.map[outpost.text] = outpost;
	// 				data.push(outpost.text);
	// 			});

	// 			process(data);
	// 		}
	// 		// Fetch source data from server
	// 		else
	// 		{
	// 			$.post('/ajax/fetch-search-sources', null, 'json')
	// 			.done(function(response)
	// 			{
	// 				object.outposts = response;

	// 				$.each(object.outposts, function(i, outpost)
	// 				{
	// 					object.map[outpost.text] = outpost;
	// 					data.push(outpost.text);
	// 				});

	// 				process(data);
	// 			});
	// 		}
	// 	},
	// 	highlighter: function (item)
	// 	{
	// 		var regex = new RegExp( '(' + this.query + ')', 'gi' );
	// 		return item.replace( regex, "<strong>$1</strong>" );
	// 	},
	// 	updater: function(item)
	// 	{
	// 		var data = this.map[item];

	// 		// If on same continent, pane map to location
	// 		if ( continent && data.continent.slug === continent.slug )
	// 		{
	// 			map.setView([data.lat, data.lng], 4);
	// 		}
	// 		// Otherwise, link to continent and location
	// 		else
	// 		{
	// 			// No Server Set
	// 			if ( !server )
	// 			{
	// 				var slug = 'briggs';

	// 				// Fetch Last used Server, fallback to Briggs by default
	// 				if ( Modernizr.localstorage )
	// 					slug = localStorage.getItem('recent.server.slug').replace(/"/g,"") || slug;

	// 				server = { slug: slug };
	// 			}
	// 			window.location = '/'+server.slug+'/'+data.continent.slug+'?x='+data.lat+'&y='+data.lng+'&z=4';
	// 		}
	// 		return item;
	// 	}
	// });
});

// Page Visibility
function getHiddenProp()
{
	var prefixes = ['webkit','moz','ms','o'];

	// if 'hidden' is natively supported just return it
	if ('hidden' in document) return 'hidden';

	// otherwise loop over all the known prefixes until we find one
	for (var i = 0; i < prefixes.length; i++){
		if ((prefixes[i] + 'Hidden') in document)
			return prefixes[i] + 'Hidden';
	}

	// otherwise it's not supported
	return null;
}

function pageIsHidden()
{
	var prop = getHiddenProp();
	if (!prop) return false;
	return document[prop];
}

function pageIsVisible()
{
	return !pageIsHidden();
}


