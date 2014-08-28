// Handle Alerts
(function(){

$(function(){
	// Fetch current alert status
	var url = "http://census.soe.com/get/ps2/world_event?type=METAGAME&c:join=metagame_event&c:lang=en&world_id=" + server.id + "&c:limit=10&callback=?";
	$.getJSON(url)
		.done(function(data){
			console.log(data);

		})
		// Failed connection
		.fail(function(){

		});


})();


});
