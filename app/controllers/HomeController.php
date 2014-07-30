<?php

class HomeController extends BaseController {

	public function getIndex()
	{
		$servers = Server::orderBy('name')
			->remember(1440)
			->get();

		return View::make('home/indexnew', compact('servers'));
	}

	public function getSettings()
	{
		return View::make('map/settings');
	}

	public function postSettings()
	{
		// Save colors to session
		if ( Input::has('nc-color') )
			Session::put('faction-colors.nc',Input::get('nc-color'));
		if ( Input::has('tr-color') )
			Session::put('faction-colors.tr',Input::get('tr-color'));
		if ( Input::has('vs-color') )
			Session::put('faction-colors.vs',Input::get('vs-color'));

		return Redirect::to('/settings')->with('message', 'Settings Saved');
	}

}

