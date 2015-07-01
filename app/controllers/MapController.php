<?php

Class MapController extends BaseController
{
	public function __construct(){
		$this->servers = Config::get('ps2maps.servers');
	}

	public function server($server_slug)
	{
		// Is valid server?
		if (!isset($this->servers[$server_slug])) {
			return App::abort('404');
		}

		// Get the server
		$server = $this->servers[$server_slug];

		// Save the server to the session
		Session::set('server', $server);
		View::share('sessionServer', $server);

		return View::make('server/index', compact('server'));
	}

	public function continent($server_slug, $continent_slug)
	{
		// Is valid server?
		if (!isset($this->servers[$server_slug])) {
			return App::abort('404');
		}
		$server = $this->servers[$server_slug];

		$continent = Continent::where('slug','=',$continent_slug)->remember(1440)->first();

		if ( is_null($continent) )
			return App::abort('404');

		// Save the server to the session
		Session::set('server', $server);
		View::share('sessionServer', $server);

		return View::make('server/continent', compact('server', 'continent'));
	}

	public function embed($server_slug, $continent_slug)
	{
		// Is valid server?
		if (!isset($this->servers[$server_slug])) {
			return App::abort('404');
		}
		$server = $this->servers[$server_slug];
		$continent = Continent::where('slug','=',$continent_slug)->remember(1440)->first();

		if ( is_null($continent) )
			return App::abort('404');

		return View::make('server/embed', compact('server', 'continent'));
	}
}
