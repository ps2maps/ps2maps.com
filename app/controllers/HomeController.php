<?php

class HomeController extends BaseController {

	public function getIndex()
	{
		$servers = Server::where('enabled','=','yes')->orderBy('name')->get();

		return View::make('home/index', compact('servers'));
	}

}

