<?php

// Get all enabled servers
$views = array(
	'menu',
	'home/index',
	'server/index',
	'server/continent',
);
View::composer($views, function($view)
{
	// Get all servers
	$servers = Server::whereEnabled('yes')
		->orderBy('name')
		->remember(1440)
		->get()
		->getDictionary();

	$view->with('servers', $servers);
});

// Get all enabled continents
$views = array(
	'menu',
	'home/indexnew',
	'server/index',
	'server/continent',
);
View::composer($views, function($view)
{
	$continents = Continent::orderBy('name')
		->whereEnabled('yes')
		->where('slug','!=','vRTraining')
		->remember(1440)
		->get()
		->getDictionary();

	$view->with('continents', $continents);
});

// Get Session Server
$views = [
	'menu',
];
View::composer($views, function($view)
{
	// Get the current session server, default to Connery
	$server = Session::get('server', function(){
		return Server::where('slug','=','connery')
			->remember(1440)
			->first();
	});

	$view->with('sessionServer', $server);
});

// Get Faction Colors
$views = [
	'factionColors',
];
View::composer($views, function($view)
{
	$factionColors = Session::get('faction-colors', Config::get('ps2maps.faction-colors'));
	$view->with('factionColors', $factionColors);
});
