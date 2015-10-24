got = require('got');
mongoose = require('mongoose');

console.log("ps2maps.com Database Seeding");
console.log("============================");

// Census variables
census = {
	url: "http://census.daybreakgames.com/get/",
	version: 'v2',
	namespaces: [
		'ps2',
		'ps2ps4us',
		'ps2ps4eu'
	],
	defaultNamespace: 'ps2'
}


// Seed servers
// require('./servers')();

// Seed continents
require('./continents')(census);
