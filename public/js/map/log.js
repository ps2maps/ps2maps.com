(function(){

	// Initialize Log Window
	var logWindow = $('.log-body');

	// Set height from localStorage or default value
	var height = cache.getItem('ps2maps.log.height');
	if ( !height || height < 0 )
		height = '30%';
	logWindow.css('height', height);

	// Resize Handle
	$('.log-header').on('mousedown', function(e){
		var orig_h = logWindow.height(), pos_y = e.pageY;
		dragging = true;

		$(document).on('mousemove', function(e) {
			if (dragging) {
				var h = orig_h + (pos_y - e.pageY);
				if ( h < 0 )
					h = 0;
				logWindow.css('height', h);
				cache.setItem('ps2maps.log.height', h);
			}
		}).on('mouseup', function() {
			dragging = false;
		});

		e.preventDefault();
	});

	ps2maps.logText = function(message)
	{
		var list = $('.log-list ul');
		var time = moment().format(timeFormat);

		var html = "<li class='misc'><div class='col-xs-12'><span class='timestamp'>" + time + "</span> " + message + "</div></li>";
		if ( $('#filter-misc').is(':checked') ) {
			$(html).hide().css('opacity',0).prependTo(list).slideDown('slow').animate({opacity: 1.0});
		} else {
			$(html).hide().prependTo(list);
		}
	}

	ps2maps.logFacilityControl = function(facility_id, old_faction_id, new_faction_id, timestamp)
	{
		var list = $('.log-list ul');

		// Delete old values off end of list
		// var max = 100;
		// var children = list.children();
		// for ( var c = children.length-1; c >= max-1; c-- ) {
		// 	children[c].fadeOut().remove();
		// }

		// Add new list item
		var faction = ps2maps.factions[new_faction_id];
		var facility = ps2maps.facilities[facility_id];

		// Determine the local capture time
		var time = moment.unix(timestamp).format(timeFormat);

		// Resecured or Captured?
		var verb = old_faction_id == new_faction_id ? "resecured" : "captured";

		// The facility icon
		var icon = "<div class='facility-icon'><svg viewBox='0 0 256 256' class='marker-icon " + facility.facilityType + " " + faction.slug + "'><use xlink:href='#" + facility.facilityType + "'></use></svg></div>";

		// The HTML
		var html = "<li class='" + faction.slug + " " + verb + "'><div class='col-xs-12'><span class='timestamp'>" + time + "</span> " + icon + " <a class='" + faction.slug + "' href='javascript:ps2maps.viewFacility("+ facility_id + ");'>" + facility.name +"</a> - ";
		html += verb + " by the <span class='" + faction.slug + "'>" + faction.name +"</span></div></li>";

		// Hide or show log item depending on current filters
		if ( $('#filter-' + faction.slug).is(':checked') && $('#filter-' + verb).is(':checked') ) {
			$(html).hide().css('opacity',0).prependTo(list).slideDown('slow').animate({opacity: 1.0});
		} else {
			$(html).hide().prependTo(list);
		}
	}

	$(function(){
		// Set Filter checkbox values
		$('.filter-checkbox').each(function(){
			$(this).prop('checked', cache.getItem('ps2maps.log.filter.' + $(this).data('filter'), true));
		});

		// Filter checkbox handling
		ps2maps.logList = $('.log-list ul');
		$('.filter-checkbox').on('click', function(){
			var type = $(this).data('filter');
			var checked = $(this).is(':checked');
			if ( checked ) {
				ps2maps.logList.find('.'+type).fadeIn();
			} else {
				ps2maps.logList.find('.'+type).fadeOut();
			}
			cache.setItem('ps2maps.log.filter.' + type, checked);
		});
	});

})();
