console.log("ps2maps.com Database Seeding");
console.log("============================");

got = require('got');
mongoose = require('mongoose');
var database = mongoose.connect('mongodb://localhost/ps2maps');

// Census variables
census = {
	url: "http://census.daybreakgames.com/",
	version: 'v2',
	namespaces: [
		'ps2',
		'ps2ps4us',
		'ps2ps4eu'
	],
	serviceId: 'ps2maps'
}

// Seed servers
new Promise(function(resolve, reject){
	require('./servers')(function(){
		resolve();
	});
}).then(function(){

	// Seed continents
	return new Promise(function(resolve, reject){
		require('./continents')(function(){
			resolve();
		});
	});
}).then(function(){

	// Done seeding
	console.log("Seeding complete");
	database.disconnect();
});

