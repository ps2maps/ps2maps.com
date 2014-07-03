(function(){
	var logWindow = $('.log');

	// Init
	var height = cache.getItem('ps2maps.log.height');
	if ( !height || height <= 0 )
		height = '30%';
	logWindow.css('height', height);

	// Resize Handle
	$('.log-resize-handle').on('mousedown', function(e){
		var orig_h = logWindow.height(), pos_y = e.pageY;
		dragging = true;

		$(document).on('mousemove', function(e) {
			if (dragging) {
				var h = orig_h + (pos_y - e.pageY);
				logWindow.css('height', h);
				cache.setItem('ps2maps.log.height', h);
			}
		}).on('mouseup', function() {
			dragging = false;
		});

		e.preventDefault();
	});

})();
