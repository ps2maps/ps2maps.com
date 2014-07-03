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



(function(){
	// The localStorage option has some limitations both in the
	// way that it treats values and in the way that it checks
	// for existence. As such, this Cache object will provide
	// a better proxy.

	function Cache(nativeStorage, serializer) {

		// Store the native storage reference as the object that
		// we are going to proxy. This object must uphold the
		// HTML5 Storage interface.
		this.storage = nativeStorage;

		// Store the serialization behavior. This object must
		// uphold the JSON interface for serialization and
		// deserialization.
		this.serializer = serializer;
	}


	// Set up the class methods.
	Cache.prototype = {

		// I clear the cache.
		clear: function () {
			// Clear the storage container.
			this.storage.clear();

			// Return this object reference for method chaining.
			return (this);
		},


		// I get an item from the cache. If the item cannot be
		// found, I can pass back an optional default value.
		getItem: function (key, defaultValue) {
			// Get the cached item.
			var value = this.storage.getItem(key);

			// Check to see if it exists. If it does, then we
			// need to deserialize it.
			if (value == null) {

				// No cached item could be found. Now, we either
				// have to return the default value, or we have
				// to return Null. We have to be careful here,
				// though, because the default value might be a
				// falsy.
				return (
				(typeof (defaultValue) != "undefined") ?
					defaultValue :
					null);

			} else {

				// The value was found; return it in its
				// original form.
				return (
					this.serializer.parse(value));
			}
		},


		// I check to see if the given key exists in the storage
		// container.
		hasItem: function (key) {
			// Simply check to see if the key access results in a
			// null value.
			return (
				this.storage.getItem(key) != null);
		},


		// I remove the given item from the cache.
		removeItem: function (key) {
			// Remove the key from the storage container.
			this.storage.removeItem(key);

			// Return this object reference for method chaining.
			return (this);
		},


		// I store the item in the cache. When doing this, I
		// automatically serialize the value.
		//
		// NOTE: Not all value (ex. functions and private
		// variables) will serialize.
		setItem: function (key, value) {
			// Store the serialize value.
			this.storage.setItem(
				key,
				this.serializer.stringify(value));

			// Return this object reference for method chaining.
			return (this);
		}

	};
	cache = new Cache(localStorage, JSON);
})();

