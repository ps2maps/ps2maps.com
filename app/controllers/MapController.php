<?php

Class MapController extends BaseController
{
	public function server($server)
	{
		// Find the server
		$server = Server::where('slug','=',$server)
			->remember(1440)
			->first();

		if ( is_null($server) )
			return App::abort('404');

		// Save the server to the session
		Session::set('server', $server);
		View::share('sessionServer', $server);

		return View::make('server/index', compact('server'));
	}

	public function continent($server_slug, $continent_slug)
	{
		$server = Server::where('slug','=',$server_slug)->remember(1440)->first();
		$continent = Continent::where('slug','=',$continent_slug)->remember(1440)->first();

		if ( is_null($server) or is_null($continent) )
			return App::abort('404');

		// Save the server to the session
		Session::set('server', $server);
		View::share('sessionServer', $server);

		return View::make('server/continent', compact('server', 'continent'));
	}

	public function embed($server_slug, $continent_slug)
	{
		$server = Server::where('slug','=',$server_slug)->remember(1440)->first();
		$continent = Continent::where('slug','=',$continent_slug)->remember(1440)->first();

		if ( is_null($server) or is_null($continent) )
			return App::abort('404');

		return View::make('server/embed', compact('server', 'continent'));
	}
}
