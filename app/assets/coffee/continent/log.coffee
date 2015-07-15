# Set the log height, default to 30% of window height
height = store.get('ps2maps.log.height', $$(window).height()*.3)
$$('.log-body').css('height', height)

# Resize Handle
$$('.log-header').on('mousedown touchstart', (e)->
	orig_h = $$('.log-body').height()
	pos_y = e.pageY
	dragging = true

	$$(document).on('mousemove touchmove', (e)->
		if dragging
			logHeight = orig_h + pos_y - e.pageY
			if logHeight < 0
				logHeight = 0
			$$('.log-body').css('height', logHeight)
			store.set('ps2maps.log.height', logHeight)
	).on('mouseup touchend', ()->
		$$('.log-count').html('')
		dragging = false
	)
	e.preventDefault()
)

# Log a continent lock
ps2maps.logContinentLock = (faction, continent) ->
	time = moment().format(timeFormat)

	html  = "<li class='log-item " + faction.slug + " misc'><div class='col-xs-12'>"
	html += "<span class='timestamp'>" + time + "</span> "
	html += "<span class='" + faction.slug + "'>" + faction.slug.toUpperCase() + "</span>"
	html += " have conquered "
	html += "<a href='/" + server.slug + "/" + continent.slug + "'>" + continent.name + "</a>"
	html += "</div></li>"

	if $$('#filter-' + faction.slug).is(':checked') and $$('#filter-misc').is(':checked')
		$(html).hide().css('opacity',0).prependTo($$('.log-list ul')).slideDown('slow').animate({opacity:1.0})
		ps2maps.logIncrement()
	else
		$(html).hide().prependTo($$('.log-list ul'))

# Log a continent lock
ps2maps.logContinentUnlock = (continent) ->
	time = moment().format(timeFormat)

	html  = "<li class='log-item misc'><div class='col-xs-12'>"
	html += "<span class='timestamp'>" + time + "</span> "
	html += "<a href='/" + server.slug + "/" + continent.slug + "'>" + continent.name + "</a>"
	html += " is now unlocked</div></li>"

	if $$('#filter-misc').is(':checked')
		$(html).hide().css('opacity',0).prependTo($$('.log-list ul')).slideDown('slow').animate({opacity:1.0})
		ps2maps.logIncrement()
	else
		$(html).hide().prependTo($$('.log-list ul'))

# Log text message
ps2maps.logText = (message) ->
	time = moment().format(timeFormat)

	html = "<li class='misc'><div class='col-xs-12'><span class='timestamp'>" + time + "</span> " + message + "</div></li>"

	if $$('#filter-misc').is(':checked')
		# If Misc filter is checked, add it and show it
		$(html).hide().css('opacity',0).prependTo($$('.log-list ul')).slideDown('slow').animate({opacity: 1.0})
		ps2maps.logIncrement()
	else
		# Add item to list, don't show it
		$(html).hide().prependTo($$('.log-list ul'))

# Increment the log count if log is minimized
ps2maps.logIncrement = () ->
	if $$('.log-body').height() == 0
		logCount = $$('.log-count')
		count = parseInt(logCount.html())
		if isNaN(count)
			count = 0

		logCount.html(count + 1)

ps2maps.logFacilityResecure = (facilityId, factionId, timestamp) ->

	# Add new list item
	faction = ps2maps.factions[factionId]
	facility = ps2maps.facilities[facilityId]

	# Determine the local capture time
	time = moment.unix(timestamp).format(timeFormat)

	# The facility icon
	icon  = "<div class='facility-icon'>"
	icon += "<svg class='marker-icon " + facility.facilityType + " " + faction.slug + "'>"
	icon += "<use xlink:href='/img/sprites.svg#" + facility.facilityType + "'/>"
	icon += "</svg></div>"

	# The HTML
	html  = "<li class='log-item " + faction.slug + " resecured'><div class='col-xs-12'>"
	html += "<span class='timestamp'>" + time + "</span> "
	html += "<span class='faction " + faction.slug + "'>" + faction.slug.toUpperCase() + "</span> "
	html += "<span class='verb'>resecured</span>" + icon
	html += "<a href='javascript:ps2maps.viewFacility("+ facilityId + ")'>" + facility.name + "</a>"
	html += "</div></li>"

	# Add item to list and show it
	if $$('#filter-' + faction.slug).is(':checked') and $$('#filter-resecured').is(':checked')
		$(html).hide().css('opacity',0).prependTo($$('.log-list ul')).slideDown('slow').animate({opacity: 1.0})
		ps2maps.logIncrement()
	else # Add item to list, don't show it
		$(html).hide().prependTo($$('.log-list ul'))


ps2maps.logFacilityCapture = (facilityId, factionId, timestamp) ->
	faction = ps2maps.factions[factionId]
	facility = ps2maps.facilities[facilityId]

	# Determine the local capture time
	time = moment.unix(timestamp).format(timeFormat)

	# The facility icon
	icon  = "<div class='facility-icon'>"
	icon += "<svg class='marker-icon " + facility.facilityType + " " + faction.slug + "'>"
	icon += "<use xlink:href='/img/sprites.svg#" + facility.facilityType + "'/>"
	icon += "</svg></div>"

	# The HTML
	html  = "<li class='log-item " + faction.slug + " captured'><div class='col-xs-12'>"
	html += "<span class='timestamp'>" + time + "</span> "
	html += "<span class='faction " + faction.slug + "'>" + faction.slug.toUpperCase() + "</span> "
	html += "<span class='verb'>captured</span>" + icon
	html += "<a href='javascript:ps2maps.viewFacility("+ facilityId + ")'>" + facility.name + "</a>"
	html += "</div></li>"

	if $$('#filter-' + faction.slug).is(':checked') and $$('#filter-captured').is(':checked')
		# Add item to list and show it
		$(html).hide().css('opacity',0).prependTo($$('.log-list ul')).slideDown('slow').animate({opacity: 1.0})
		ps2maps.logIncrement()
	else
		 # Add item to list, don't show it
		$(html).hide().prependTo($$('.log-list ul'))

	# Delete old values off end of list
	# max = 100
	# children = list.children()
	# # for ( var c = children.length-1 c >= max-1 c-- )
	# c = children.length-1
	# while ( c >= max-1 )
	# 	children[c].fadeOut().remove()
	# 	c--

# Filter UI initialization
$$('.filter-checkbox').each( () ->
	$(this).prop('checked', store.get('ps2maps.log.filter.' + $(this).data('filter'), true))
)
