<?php



Class ServerController extends BaseController
{
	public function server($server)
	{
		// Find the server
		$server = Server::where('slug','=',$server)
			->remember(1440)
			->first();

		if ( is_null($server) )
			return App::abort('404');

		return View::make('server/index');

	}

	public function continent($server, $continent)
	{
		$server = Server::where('slug','=',$server)->first();
		$continent = Continent::where('slug','=',$continent)->first();

		if ( is_null($server) or is_null($continent) )
			return App::abort('404');

		// $regionScript = '.js';
		$tileVersion ="/20140612";
		$tileVersion ="";

		$data = compact('server', 'continent', 'regionScript', 'tileVersion');

		return View::make('map', $data);

	}

	public function embed($server, $continent)
	{
		$server = Server::where('slug','=',$server)->first();
		$continent = Continent::where('slug','=',$continent)->first();

		if ( is_null($server) or is_null($continent) )
			return App::abort('404');



	}

}
