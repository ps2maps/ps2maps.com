'use strict';

// Mongo connection
var database = mongoose.connect('mongodb://localhost/ps2maps');

// Server model
var Server = require('../models/server');

console.log("Seeding servers");

var download = function() {

	console.log("\tFetching servers from Census API...");

	var promises = [];

	// Iterate thru namespaces
	for (let namespace of census.namespaces) {

		var promise = new Promise(function(resolve, reject) {

			// Get Census data
			var url = census.url + namespace + ':' + census.version + '/world?c:limit=100';
			got.get(url, { json: true }, function(err, body, res){

				// Handle errors
				if (err) {
					throw new Error(err);
				} else if (body.error) {
					throw new Error(body.error);
				}

				// Iterate through lists of worlds/servers
				var servers = [];
				for (let world of body.world_list) {

					// Create new server document
					let server = new Server({
						id: world.world_id,
						name: world.name,
						online: world.state,
						namespace: namespace
					});
					servers.push(server);

					// Save server document to database
					server.save(function(err) {
						if (err) {
							reject(err);
						}
						console.log("\tAdded server: " + server.name.en);
					});
				}
				resolve(servers);
			});

		});
		promises.push(promise);

	}

	// Close database after everything is done
	Promise.all(promises).then(function(lists) {
		database.disconnect();
	});

}

module.exports = function() {

	console.log("\tDeleting servers collection...");

	// Drop collection from database
	mongoose.connection.collections['servers'].drop(function(err){

		// Download from Census API
		download();
	});
}
