$logWindow = $('.log-body')
$logCount = $('.log-count')

# Set the log height, default to 30% of window height
height = cache.getItem('ps2maps.log.height', $(window).height()*.3)
$logWindow.css('height', height)

# Resize Handle
$('.log-header').on('mousedown touchstart', (e)->
	orig_h = $logWindow.height()
	pos_y = e.pageY
	dragging = true

	$(document).on('mousemove touchmove', (e)->
		if dragging
			h = orig_h + pos_y - e.pageY
			if h < 0
				h = 0
			$logWindow.css('height', h)
			cache.setItem('ps2maps.log.height', h)
	).on('mouseup touchend', ()->
		$logCount.html('')
		dragging = false
	)
	e.preventDefault()
)

# Log a continent lock
ps2maps.logContinentLock = (faction, continent) ->
	$list = $('.log-list ul')
	time = moment().format(timeFormat)

	html  = "<li class='log-item " + faction.slug + " misc'><div class='col-xs-12'>"
	html += "<span class='timestamp'>" + time + "</span> "
	html += "<span class='" + faction.slug + "'>" + faction.slug.toUpperCase() + "</span> "
	html += "locked the continent of "
	html += "<a href='/" + server.slug + "/" + continent.slug + "'>" + continent.name +"</a>"
	html += "</div></li>"

	if $('#filter-' + faction.slug).is(':checked') and $('#filter-misc').is(':checked')
		$(html).hide().css('opacity',0).prependTo(list).slideDown('slow').animate({opacity:1.0})
		ps2maps.logIncrement()
	else
		$(html).hide().prependTo(list)

# Log text message
ps2maps.logText = (message) ->
	list = $('.log-list ul')
	time = moment().format(timeFormat)

	html = "<li class='misc'><div class='col-xs-12'><span class='timestamp'>" + time + "</span> " + message + "</div></li>"

	if $('#filter-misc').is(':checked')
		$(html).hide().css('opacity',0).prependTo(list).slideDown('slow').animate({opacity: 1.0})
		ps2maps.logIncrement()
	else # Add item to list, don't show it
		$(html).hide().prependTo(list)

# Increment the log count if log is minimized
ps2maps.logIncrement = () ->
	if $('.log-body').height() == 0
		logCount = $('.log-count')
		count = parseInt(logCount.html())
		if isNaN(count)
			count = 0

		logCount.html(count + 1)

ps2maps.logFacilityControl = (facility_id, old_faction_id, new_faction_id, timestamp) ->
	list = $('.log-list ul')

	# Add new list item
	faction = ps2maps.factions[new_faction_id]
	facility = ps2maps.facilities[facility_id]

	# Determine the local capture time
	time = moment.unix(timestamp).format(timeFormat)

	# Resecured or Captured?
	verb = old_faction_id == new_faction_id ? "resecured" : "captured"

	# The facility icon
	icon = "<div class='facility-icon'><svg viewBox='0 0 256 256' class='marker-icon " + facility.facilityType + " " + faction.slug + "'><use xlink:href='#" + facility.facilityType + "'></use></svg></div>"

	# The HTML
	html  = "<li class='log-item " + faction.slug + " " + verb + "'><div class='col-xs-12'>"
	html += "<span class='timestamp'>" + time + "</span> "
	html += "<span class='" + faction.slug + "'>" + faction.slug.toUpperCase() + "</span> "
	html += verb + icon
	html += "<a href='javascript:ps2maps.viewFacility("+ facility_id + ")'>" + facility.name +"</a>"
	html += "</div></li>"

	# Add item to list and show it
	if  $('#filter-' + faction.slug).is(':checked') && $('#filter-' + verb).is(':checked')
		$(html).hide().css('opacity',0).prependTo(list).slideDown('slow').animate({opacity: 1.0})
		ps2maps.logIncrement()
	else # Add item to list, don't show it
		$(html).hide().prependTo(list)

	# Delete old values off end of list
	max = 100
	children = list.children()
	# for ( var c = children.length-1 c >= max-1 c-- )
	c = children.length-1
	while ( c >= max-1 )
		children[c].fadeOut().remove()
		c--

# Filter UI initialization
$('.filter-checkbox').each( () ->
	$(this).prop('checked', cache.getItem('ps2maps.log.filter.' + $(this).data('filter'), true))
)

# Filter checkbox handling
ps2maps.logList = $('.log-list ul')
$('.filter-checkbox').on('click', () ->
	type = $(this).data('filter')
	checked = $(this).is(':checked')
	if checked
		ps2maps.logList.find('.'+type).fadeIn()
	else
		ps2maps.logList.find('.'+type).fadeOut()

	cache.setItem('ps2maps.log.filter.' + type, checked)
)

$('.log-minimize').on('click', () ->
	log = $('.log-body')
	if log.is(':visible')
		$(this).addClass('closed')
		log.hide()
	else
		$(this).removeClass('closed')
		log.show()
)

$('.clear-button').on('click', () ->
	if confirm("Clear the Facility Capture Log history?")
		$('.log-body li').remove()
)
