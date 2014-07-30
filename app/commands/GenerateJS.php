<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

// use Hex;

class GenerateJS extends Command {

	private $monolog;
	private $outputPath;
	private $hexParams;
	private $continents;
	private $vertexPrecision = 3;

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'ps2maps:continent-scripts';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Generate continent JavaScript files.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->monolog = new Logger('GENERATEJS');
		$this->monolog->pushHandler(new StreamHandler(storage_path().'/logs/generatejs.log', Logger::INFO));

		$this->outputPath = public_path().'/js/';

		// Hex size and origin
		$width = 6.25;
		$height = 7.07;
		$originX = 6.15;
		$originY = 3.5;

		// Hex math stuff
		$a = -3.0;
		$b = (-2.0 * $width);
		$c = (pow($width, 2)) + (pow($height, 2));
		$z = (-$b - sqrt(pow($b, 2) - (4.0*$a*$c)))/(2.0*$a);
		$x = ($width-$z)/2.0;
		$y = $height/2.0;
		$side = $z;

		$this->hexParams = compact('width', 'height', 'originX', 'originY', 'side');

		ini_set('xdebug.var_display_max_depth',10);

		parent::__construct();
	}

	private function log($message, $extra=array())
	{
		if ( $this->option('verbose') ) {
			$this->info($message." ".json_encode($extra));
		}

		$this->monolog->addNotice($message, $extra);
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
		if ( !Schema::hasTable('continents') ) {
			$this->log("Missing continents table.");
			return false;
		}

		$this->continents = Continent::whereEnabled('yes')
			->where('slug','!=','vRTraining')
			->orderBy('name')
			->get();

		// Loop through available continents
		foreach( $this->continents as $continent ) {
			if ( $this->option($continent->slug) == false and $this->option('all') == false )
				continue;

			$this->log("Generating " . $continent->name . " script");

			// Regions
			$this->log('Calculating Hex Regions');
			$regions = $this->json_pretty_print(json_encode($this->getRegions($continent)));

			// Facility + Facility Link data
			$this->log('Fetching Facilities');
			$facilities = $this->json_pretty_print(json_encode($this->getFacilities($continent)));

			// Marker data

			$carbon = new Carbon\Carbon();

			$data = compact('continent', 'carbon', 'regions', 'facilities');

			$output = View::make('js/continent', $data)->render();
			$file = $this->outputPath.$continent->slug.'.js';

			// if ( file_exists($file) and $this->option('overwrite') == false )
			// 	$file = $this->outputPath.$continent->slug.'-'.$carbon->timestamp.'.js';

			$f = fopen($file, 'w');
			fwrite($f, $output);
			fclose($f);

			$this->log($file." generated");
		}
	}

	public function getRegions($continent)
	{
		$regions = [];
		// Loop through regions, calculate hex coordinates
		foreach( $continent->regions as $region ) {

			$tmp['facility_id'] = (int)$region->facility->id;
			$tmp['currency'] = (int)$region->facility->currency_amount;
			$tmp['currency_id'] = (int)$region->facility->currency_id;
			$tmp['points'] = $this->calculateHexCoordinates($region);

			$regions[(int)$region->id] = $tmp;
		}
		return $regions;
	}

	public function calculateHexCoordinates($region)
	{
		// Skip region if it doesn't have hexes
		if ( count($region->hexes) == 0 )
			continue;

		// Build array of hex coordinates
		$hexes = [];
		foreach( $region->hexes as $hex ) {

			// Offset the hex coordinates
			$hex->x = $hex->x + 30;
			$hex->y = ($hex->y*-1) + 22;

			$hexes[] = new Hex\Hexagon($this->hexParams, new Hex\HexCoordinate($hex->x, $hex->y));
		}

		// Find the polygon verticies
		$polygon = new Hex\PolygonTerritory($hexes);
		$coordinates = [];
		foreach( $polygon->vertices() as $vertex ) {
			$vertex->x = round($vertex->x, $this->vertexPrecision);
			$vertex->y = round($vertex->y, $this->vertexPrecision);
			$coordinates[] = [$vertex->x, $vertex->y];
		}

		return $coordinates;
	}

	public function getFacilities($continent)
	{
		$output = [];

		// Iterate through the Facility types
		foreach( FacilityType::orderBy('name')->get() as $type ) {

			// Get the markers for the facilities nnnnnnnnnnnnnn
			$facilities = Facility::with('FacilityType')
				->with('linkedFacilities')
				->where('continent_id','=',$continent->id)
				->where('facility_type_id','=',$type->id)
				->orderBy('name')
				->get();

			// Skip if no markers exist for that type
			if ( count($facilities) == 0 ) {
				$this->log("No ".$type->name." facilities found.");
				continue;
			}

			$output[$type->slug] = [];

			// Add the facilities to the output
			foreach( $facilities as $facility ) {

				// Ignore if Warpgate facility has no position
				if ( strpos($facility->name, 'Warpgate') !== false and (is_null($facility->lat) or is_null($facility->lng) or $facility->lat == 0 or $facility->lng == 0 )) {
					$this->log($facility->name." has no position");
					continue;
				}

				// Facility Name
				$output[$type->slug][$facility->id] = [
					'name' => $facility->name
				];

				// Facility Position
				if ( !is_null($facility->lat) or !is_null($facility->lng) ) {
					$output[$type->slug][$facility->id]['xy'] = [(float)$facility->lat, (float)$facility->lng ];
				} else {
					$output[$type->slug][$facility->id]['xy'] = [(float)$facility->lat_override, (float)$facility->lng_override ];
				}


				// Lattice Links
				if ( count($facility->linkedFacilities) > 0 ) {
					$output[$type->slug][$facility->id]['links'] = [];
					foreach( $facility->linkedFacilities as $linkedFacility ) {
						$output[$type->slug][$facility->id]['links'][] = (int)$linkedFacility->id;
					}
				}
			}
		}
		return $output;
	}

	public function getLattice($continent)
	{

	}

	protected function getArguments()
	{
		return array(
		);
	}

	protected function getOptions()
	{
		$options[] = ['all', null, InputOption::VALUE_NONE, 'Generate scripts for all continents.', null];
		if ( Schema::hasTable('continents') ) {
			foreach( Continent::where('enabled','=','yes')->orderBy('name')->get() as $continent ) {
				$options[] = [$continent->slug, null, InputOption::VALUE_NONE, 'Generate script for '.$continent->name.'.', null];
			}
		}
		return $options;
	}

	private function json_pretty_print($json)
	{
		$result      = '';
		$pos         = 0;
		$strLen      = strlen($json);
		$indentStr   = '  ';
		$newLine     = "\n";
		$prevChar    = '';
		$outOfQuotes = true;

		for ($i=0; $i<=$strLen; $i++) {

			// Grab the next character in the string.
			$char = substr($json, $i, 1);

			// Are we inside a quoted string?
			if ($char == '"' && $prevChar != '\\') {
				$outOfQuotes = !$outOfQuotes;

			// If this character is the end of an element,
			// output a new line and indent the next line.
			} else if(($char == '}' || $char == ']') && $outOfQuotes) {
				$result .= $newLine;
				$pos --;
				for ($j=0; $j<$pos; $j++) {
					$result .= $indentStr;
				}
			}

			// Add the character to the result string.
			$result .= $char;

			// If the last character was the beginning of an element,
			// output a new line and indent the next line.
			if (($char == ',' || $char == '{' || $char == '[') && $outOfQuotes) {
				$result .= $newLine;
				if ($char == '{' || $char == '[') {
					$pos ++;
				}

				for ($j = 0; $j < $pos; $j++) {
					$result .= $indentStr;
				}
			}

			$prevChar = $char;
		}

		return $result;
	}

}
