'use strict';

// Mongo connection
var database = mongoose.connect('mongodb://localhost/ps2maps');

// Continent model
var Continent = require('../models/continent');

console.log("Seeding continents");

var download = function() {

	console.log("\tFetching continents from Census API...");

	// Get Census data
	var url = census.url + census.defaultNamespace + ':' + census.version + '/zone?c:limit=1000';
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

			var promise = new Promise(function(resolve, reject){

				// Create new continent document
				let continent = new Continent({
					id: zone.zone_id,
					name: zone.name,
					description: zone.description
				});

				// Save document  to database
				continent.save(function(err){
					if (err) {
						throw new Error(err);
					}

					console.log("\tAdded continent: " + continent.name.en);
					resolve(continent);
				});
			});
			promises.push(promise);
		}

		// Disconnect database after everything is done
		Promise.all(promises).then(function(continents){
			console.log(continents);
			database.disconnect();
		});
	});

}

module.exports = function() {

	console.log("\tDeleting continents collection...");

	// Drop collection from database
	mongoose.connection.collections['continents'].drop(function(err){

		// Download from Census API
		download();
	});
}
