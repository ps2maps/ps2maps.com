console.log("Fetching data from Census API...");

// Census Namespaces
var namespaces = [
	'ps2:v2',
	'ps2ps4us:v2',
	'ps2ps4eu:v2'
];

require('./servers')(namespaces);
