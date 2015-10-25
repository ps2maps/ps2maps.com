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
	defaultNamespace: 'ps2',
	serviceId: 'ps2maps'
}

var promises = [];

// Seed servers
promises.push(new Promise(function(resolve, reject){
	require('./servers')(function(){
		resolve();
	});
}));

// Seed continents
promises.push(new Promise(function(resolve, reject){
	require('./continents')(function(){
		resolve();
	});
}));

// Disconnect database
Promise.all(promises).then(function(results){
	database.disconnect();
});
