# # Page Visibility
# getHiddenProp: () ->
# 	prefixes = ['webkit','moz','ms','o'];

# 	#if 'hidden' is natively supported just return it
# 	if 'hidden' in document
# 		return 'hidden'

# 	# otherwise loop over all the known prefixes until we find one
# 	for prefix in prefixes
# 		if (prefix + 'Hidden') in document
# 			return prefix + 'Hidden'

# 	# otherwise it's not supported
# 	return null;

# pageIsHidden: () ->
# 	prop = getHiddenProp()
# 	if !prop
# 		return false
# 	return document[prop]

# pageIsVisible: () ->
# 	return !pageIsHidden();

# pageVisibilityChange: () ->
# 	console.log('pageVisibilityChange');
# 	#If it's been more than 10 minutes since last update (maybe computer went to sleep), then refresh the whole map first
# 	if pageIsVisible() and ps2maps.facilityControl.lastTimestamp and moment().diff(ps2maps.facilityControl.lastTimestamp, 'seconds') >= 600
# 		ps2maps.facilityControl.socket.onopen();

# # Register Page Visibility Functionality
# visbilityProperty = getHiddenProp()
# if visbilityProperty
# 	event = visbilityProperty.replace(/[H|h]idden/,'') + 'visibilitychange'
# 	document.addEventListener(event, pageVisibilityChange)

