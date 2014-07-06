<?php

// Get all enabled servers
$views = array(
	'menu',
	'home/index',
	'server/index',
);
View::composer($views, function($view)
{
	$servers = Server::orderBy('name')
		->whereEnabled('yes')
		->remember(1440)
		->get();

	$view->with('servers', $servers);
});


// Get all enabled continents
$views = array(
	'menu',
	'server/index',
	'home/indexnew',
);
View::composer($views, function($view)
{
	$continents = Continent::orderBy('name')
		->whereEnabled('yes')
		->remember(1440)
		->get();

	$view->with('continents', $continents);
});
