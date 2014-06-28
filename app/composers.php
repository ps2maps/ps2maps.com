<?php

// Get all servers
$views = array(
	'menu/menu',
	'home/index',
	'server/index',
);
View::composer($views, function($view)
{
	$servers = Server::where('enabled','=','yes')
		->orderBy('name')
		->remember(1440)
		->get();

	$view->with('servers', $servers);
});


// Get all continents
$views = array(
	'home/indexnew',
	'server/index',
);
View::composer($views, function($view)
{
	$continents = Continent::where('enabled','=','yes')
		->orderBy('name')
		->remember(1440)
		->get();

	$view->with('continents', $continents);
});
