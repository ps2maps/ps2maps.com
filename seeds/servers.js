'use strict';

// Server model
var Server = require('../models/server');

module.exports = function(callback) {

	var promises = [];

	console.log("Servers: Deleting database collection...");

	// Drop collection from database
	mongoose.connection.collections['servers'].drop(function(err){

		console.log("Servers: Fetching from Census API...");

		// Iterate thru namespaces
		for (let namespace of census.namespaces) {

			// Get Census data
			var url = census.url + "s:" + census.serviceId + "/get/" + namespace + ':' + census.version + '/world?c:limit=100';

			promises.push(new Promise(function(resolve, reject){

				// Census API request
				got.get(url, { json: true }, function(err, body, res){

					// Handle errors
					if (err) {
						throw new Error(err);
					} else if (body.error) {
						throw new Error(body.error);
					}

					body.namespace = namespace;
					resolve(body);
				});

			}));

		}

		// Close database after everything is done
		Promise.all(promises).then(function(bodies) {

			var promises = [];

			// Iterate lists of worlds
			for (let body of bodies) {

				let namespace = body.namespace;

				// Iterate worlds
				for (let world of body.world_list) {
					promises.push(new Promise(function(resolve, reject){

						// Create server document in database
						Server.create({
							id: world.world_id,
							name: world.name,
							online: world.state,
							namespace: namespace
						}, function(err, server) {
							// Handle errors
							if (err) {
								throw new Error(err);
							}
							// Resolve the server document
							console.log('Servers: Added ' + server.name.en);
							resolve(server);
						});

					}));
				}
			}

			// Finished
			Promise.all(promises).then(function(servers){
				callback();
			});
		});
	});
}
