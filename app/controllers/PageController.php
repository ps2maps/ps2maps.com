<?php

class PageController extends BaseController {

	public function getIndex()
	{
		return View::make('home/index', compact('posts'));
	}

	public function getSettings()
	{
		return View::make('map/settings');
	}

	public function postSettings()
	{
		// Hex RGB Custom Validator
		Validator::extend('hex', function($attribute, $value, $parameters){
			return preg_match("/^\#[0-9A-Fa-f]{6}$/", $value);
		});

		// Validation Rules
		$rules = [
			'nc-color' => 'required|hex',
			'tr-color' => 'required|hex',
			'vs-color' => 'required|hex',
			'time-format' => 'required|in:12,24',
		];

		// Validation
		$validator = Validator::make(Input::all(), $rules);
		if ( $validator->fails() ) {
			return Redirect::back();
		}

		// Save Hex and Dark Hex colors to Session
		foreach( ['nc', 'tr', 'vs'] as $faction ) {

			$color = strtolower(Input::get("$faction-color"));

			// Chosen color
			Session::put("faction-colors.$faction.default", $color);

			// Color darkened by 50%
			Session::put("faction-colors.$faction.dark", $this->adjustColorLightenDarken($color, 50));

			// Outline color
			if ( $color == Config::get("ps2maps.faction-colors.$faction.default") ) {
				// If color is default color, use white outline
				$outline = "#FFF";
			} else {
				// Otherwise use calculated outline color
				$outline = $this->closerToBlackOrWhite(Input::get("$faction-color")) == "#FFF" ? "#000" : "#FFF";
			}
			Session::put("faction-colors.$faction.outline", $outline);
		}


		// Save time format to session
		Session::put('time-format', Input::get('time-format'));

		return Redirect::back()->with('message', 'Settings Saved');
	}

	private function closerToBlackOrWhite($color_code) {
		$hex = str_replace("#","",$color_code);
		$r = (strlen($hex) == 3)? hexdec(substr($hex,0,1).substr($hex,0,1)):hexdec(substr($hex,0,2));
		$g = (strlen($hex) == 3)? hexdec(substr($hex,1,1).substr($hex,1,1)):hexdec(substr($hex,2,2));
		$b = (strlen($hex) == 3)? hexdec(substr($hex,2,1).substr($hex,2,1)):hexdec(substr($hex,4,2));
		$y = 0.2126*$r + 0.7152*$g + 0.0722*$b;
		return $y < 128 ? "#000" : "#FFF";
	}

	private function adjustColorLightenDarken($color_code,$percentage_adjuster = 0) {
		$percentage_adjuster = round($percentage_adjuster/100,2);
		if(is_array($color_code)) {
			$r = $color_code["r"] - (round($color_code["r"])*$percentage_adjuster);
			$g = $color_code["g"] - (round($color_code["g"])*$percentage_adjuster);
			$b = $color_code["b"] - (round($color_code["b"])*$percentage_adjuster);

			return array("r"=> round(max(0,min(255,$r))),
				"g"=> round(max(0,min(255,$g))),
				"b"=> round(max(0,min(255,$b))));
		}
		else if(preg_match("/#/",$color_code)) {
			$hex = str_replace("#","",$color_code);
			$r = (strlen($hex) == 3)? hexdec(substr($hex,0,1).substr($hex,0,1)):hexdec(substr($hex,0,2));
			$g = (strlen($hex) == 3)? hexdec(substr($hex,1,1).substr($hex,1,1)):hexdec(substr($hex,2,2));
			$b = (strlen($hex) == 3)? hexdec(substr($hex,2,1).substr($hex,2,1)):hexdec(substr($hex,4,2));
			$r = round($r - ($r*$percentage_adjuster));
			$g = round($g - ($g*$percentage_adjuster));
			$b = round($b - ($b*$percentage_adjuster));

			return "#".str_pad(dechex( max(0,min(255,$r)) ),2,"0",STR_PAD_LEFT)
			.str_pad(dechex( max(0,min(255,$g)) ),2,"0",STR_PAD_LEFT)
			.str_pad(dechex( max(0,min(255,$b)) ),2,"0",STR_PAD_LEFT);

		}
	}

	public function postSearchSources()
	{
		if ( !Request::ajax() )
			return App::abort('404');

		$searchSources = Cache::remember('searchSources', 1440, function() {

			// Get list of facilities
			$types = [
				'Warpgate',
				'Amp Station',
				'Bio Lab',
				'Tech Plant',
				'Large Outpost',
				'Small Outpost',
				'Forward Spawn Labeled'
			];
			$facilities = DB::table('facilities AS f')
				->leftJoin('continents AS c','f.continent_id','=','c.id')
				->leftJoin('facility_types AS ft','f.facility_type_id','=','ft.id')
				->whereIn('ft.name', $types)
				->orderBy('f.name')
				->select(array('f.name AS name', 'f.lat AS x', 'f.lng AS y', 'c.id AS continent_id'))
				->get();

			return $facilities;
		});

		return Response::json($searchSources);
	}

	public function getEmbeddable()
	{
		return View::make('embeddable');
	}
}

