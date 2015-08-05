<?php

return [

	'title' => "PlanetSide 2 Interactive, real time maps for Amerish, Esamir, Hossin and Indar - ps2maps.com",
	'meta_description' => "PlanetSide 2 Maps is the definitive resource for live, real time, interactive Auxaris continent maps for Amerish, Esamir, Hossin and Indar",

	'tiles' => [
		'cdn' => '//cdn{s}.ps2maps.com',
	],

	'faction-colors' => [
		'ns' => [
			'default' => '#79e0e1',
			'dark' => '#249c9e',
			'outline' => '#fff',
		],
		'nc' => [
			'default' => '#33adff',
			'dark' => '#1a5780',
			'outline' => '#fff',
		],
		'tr' => [
			'default' => '#df2020',
			'dark' => '#701010',
			'outline' => '#fff',
		],
		'vs' => [
			'default' => '#9e52e0',
			'dark' => '#4f2970',
			'outline' => '#fff',
		],
	],

	'time-formats' => [
		'12' => 'h:mm:ss a',
		'24' => 'H:mm:ss',
	],

	'apis' => [
		'default' => 'census.daybreakgames.com',
		'alternate' => 'census.soe.com',
	],

	'api_version' => 'v2',

	'servers' => [
		'briggs' => [
			'name' => 'Briggs',
			'slug' => 'briggs',
			'id' => 25,
			'env' => 'ps2',
			'platform' => 'windows',
		],
		'ceres' => [
			'name' => 'Ceres',
			'slug' => 'ceres',
			'id' => 2000,
			'env' => 'ps2ps4eu',
			'platform' => 'ps4',
		],
		'cobalt' => [
			'name' => 'Cobalt',
			'slug' => 'cobalt',
			'id' => 13,
			'env' => 'ps2',
			'platform' => 'windows',
		],
		'connery' => [
			'name' => 'Connery',
			'slug' => 'connery',
			'id' => 1,
			'env' => 'ps2',
			'platform' => 'windows',
		],
		'crux' => [
			'name' => 'Crux',
			'slug' => 'crux',
			'id' => 1002,
			'env' => 'ps2ps4us',
			'platform' => 'ps4',
		],
		'emerald' => [
			'name' => 'Emerald',
			'slug' => 'emerald',
			'id' => 17,
			'env' => 'ps2',
			'platform' => 'windows',
		],
		'genudine' => [
			'name' => 'Genudine',
			'slug' => 'genudine',
			'id' => 1000,
			'env' => 'ps2ps4us',
			'platform' => 'ps4',
		],
		'jaeger' => [
			'name' => 'Jaeger',
			'slug' => 'jaeger',
			'id' => 19,
			'env' => 'ps2',
			'platform' => 'windows',
		],
		'lithcorp' => [
			'name' => 'Lithcorp',
			'slug' => 'lithcorp',
			'id' => 2001,
			'env' => 'ps2ps4eu',
			'platform' => 'ps4',
		],
		'miller' => [
			'name' => 'Miller',
			'slug' => 'miller',
			'id' => 10,
			'env' => 'ps2',
			'platform' => 'windows',
		],
		'palos' => [
			'name' => 'Palos',
			'slug' => 'palos',
			'id' => 1001,
			'env' => 'ps2ps4us',
			'platform' => 'ps4',
		],
		'rashnu' => [
			'name' => 'Rashnu',
			'slug' => 'rashnu',
			'id' => 2002,
			'env' => 'ps2ps4eu',
			'platform' => 'ps4',
		],
		'searhus' => [
			'name' => 'Searhus',
			'slug' => 'searhus',
			'id' => 1003,
			'env' => 'ps2ps4us',
			'platform' => 'ps4',
		],
		'xelas' => [
			'name' => 'Xelas',
			'slug' => 'xelas',
			'id' => 1004,
			'env' => 'ps2ps4us',
			'platform' => 'ps4',
		],
	]
];
