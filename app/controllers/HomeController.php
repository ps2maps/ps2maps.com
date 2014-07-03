<?php

class HomeController extends BaseController {

	public function getIndex()
	{
		$servers = Server::orderBy('name')
			->remember(1440)
			->get();

		return View::make('home/indexnew', compact('servers'));
	}

}

