
facilities = []
$$('li.search').on('click', ()->

	# Make the search input visible
	$$('li.search-form').addClass('visible')

	# Focus the input
	$$('.search-input').focus();

	# Fetch facilities via ajax
	if facilities.length == 0

		$.post("/searchSources")
		.done((data)->
			$.each(data, (i, value)->
				facilities.push(value)
			)
		)
		.fail(()->
			console.error "Error fetching search sources"
		)
)
$$('.search-form .close-search').on('click', ()->
	$$('li.search-form').removeClass('visible')
)

substringMatcher = (facilities)->
	return (q, cb)->

		# an array that will be populated with substring matches
		matches = []

		# regex used to determine if a string contains the substring `q`
		substrRegex = new RegExp(q, 'i')

		# iterate through the pool of strings and for any string that
		# contains the substring `q`, add it to the `matches` array
		$.each(facilities, (i, str)->
			if (substrRegex.test(str.name))

				# the typeahead jQuery plugin expects suggestions to a
				# JavaScript object, refer to typeahead docs for more info
				matches.push(str)
		)

		cb(matches)

$$('li.search-form input')
.typeahead({
	hint: false,
	highlight: true,
	minLength: 1
},
{
	name: 'facilities',
	displayKey: 'name',
	source: substringMatcher(facilities)
}).bind('typeahead:selected', (obj, data, name)->

	if continent? && parseInt(continent.id) == parseInt(data.continent_id)
		ps2maps.map.setView([data.x,data.y],4)
	else
		window.location = "/" + server.slug + "/" + continents[data.continent_id].slug + "#" + data.x + "," + data.y + ",4z"
)
