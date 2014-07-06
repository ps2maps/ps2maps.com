<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

// use Hex;

class GenerateJS extends Command {

	private $log;
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
		$this->log = new Logger('GENERATEJS');
		$this->log->pushHandler(new StreamHandler(storage_path().'/logs/generatejs.log', Logger::INFO));

		$this->outputPath = public_path().'/js/';

		$this->continents = Continent::whereEnabled('yes')->orderBy('name')->get();

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

	private function feedback($message)
	{
		if ( $this->option('verbose') )
			$this->info($message);
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
		// Loop through available continents
		foreach( $this->continents as $continent ) {
			if ( $this->option($continent->slug) == false and $this->option('all') == false )
				continue;

			$this->feedback("Generating " . $continent->name . " script");

			$regions = [];

			// Loop through regions, calculate hex coordinates
			foreach( $continent->regions as $region ) {

				$tmp['id'] = (int) $region->id;
				$tmp['name'] = $region->name;
				$tmp['facility_id'] = $region->facility->id;
				$tmp['facility_type_id'] = $region->facility->facility_type_id;
				$tmp['currency_id'] = $region->facility->currency_id;
				$tmp['currency_amount'] = $region->facility->currency_amoun;
				$tmp['polygon'] = $this->calculateHexCoordinates($region);

				$regions[] = $tmp;
			}

			// JSON data
			$regions = $this->json_pretty_print(json_encode($regions));

			// Facility + Facility Link data
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

			$this->feedback($file." generated");
		}
	}

	public function getFacilities($continent)
	{
		$facilities = Facility::with('FacilityType')
			->where('continent_id','=',$continent->id)
			->orderBy('name')
			->get();

		$output = [];
		foreach( $facilities as $facility ) {
			$output[$facility->id] = [
				'name' => $facility->name,
				'type' => (int) $facility->facility_type_id,
				'loc' => [ (float) $facility->z, ((float) $facility->x)*-1 ],
			];
		}
		return $output;
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

	protected function getArguments()
	{
		return array(
		);
	}

	protected function getOptions()
	{
		$options[] = ['all', null, InputOption::VALUE_NONE, 'Generate scripts for all continents.', null];
		foreach( $this->continents as $continent ) {
			$options[] = [$continent->slug, null, InputOption::VALUE_NONE, 'Generate script for '.$continent->name.'.', null];
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
