var http = require('http');

module.exports = function(namespaces){

	console.log("Fetching servers...");

	var promises = [];

	// Iterate thru namespaces
	for (namespace of namespaces) {

		var promise = new Promise(function(resolve, reject){

			// Get Census data
			var url = 'http://census.daybreakgames.com/get/' + namespace + '/world?c:limit=100';
			var req = http.get(url, function(res) {
				var body = '';
				res.on('data', function(chunk){
					body += chunk;
				});
				res.on('end', function(){
					resolve(JSON.parse(body));
				});
			}).on('error', function(e){
				reject(e.message);
			});

		});
		promises.push(promise);

	}

	// After all servers are fetched...
	Promise.all(promises).then(function(data, resolve, reject){

		// Create array of servers
		var worlds = [];
		for (lists of data) {
			if (lists.world_list) {
				for (world of lists.world_list) {
					worlds.push(world);
				}
			}
		}


		return worlds;

	}).then(function(worlds){
		console.log(worlds);
	});

}
