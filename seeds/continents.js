'use strict';

// Continent model
var Continent = require('../models/continent');

module.exports = function(callback) {

	console.log("Continents: Deleting collection...");

	// Drop collection from database
	mongoose.connection.collections['continents'].drop(function(err){

		console.log("Continents: Fetching from Census API...");

		// Get Census data
		var url = census.url + "s:" + census.serviceId + "/get/" + census.defaultNamespace + ':' + census.version + '/zone?c:limit=1000';
		got.get(url, { json: true }, function(err, body, res){

			// Handle errors
			if (err) {
				throw new Error(err);
			} else if (body.error) {
				throw new Error(body.error);
			}

			// Iterate through zones/continents
			var promises = [];
			for (let zone of body.zone_list) {

				promises.push(new Promise(function(resolve, reject){

					// Create new continent document
					let continent = new Continent({
						id: zone.zone_id,
						name: zone.name,
						description: zone.description
					});

					// Save document to database
					continent.save(function(err){
						if (err) {
							throw new Error(err);
						}
						console.log('added continent ' + continent.id);
						resolve(continent);
					});

				}));
			}

			// Callback after all continents are downloaded
			Promise.all(promises).then(function(continents){
				console.log('continent THEN');
				// console.log(continents);
				for (continent of continents) {
					console.log(continent);
					console.log("Continents: Added " + continent.name.en);
				}
				console.log('done with continents');
				callback();
			});
		});

	});
}
