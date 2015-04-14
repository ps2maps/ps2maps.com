<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

use Carbon\Carbon;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Illuminate\Database\Eloquent\Collection;

class Census extends Command {

	private $baseUrl = "http://census.daybreakgames.com/s:ps2maps/get/ps2:v2/";
	private $monolog;
	private $verb = 'Comparing';
	private $latScale = 0.03126;
	private $lngScale = -0.03126;
	private $elevationScale = 0.03126;
	private $latOffset = 128;
	private $lngOffset = 128;
	private $elevationOffset = 0;
	private $precision = 2; // Decimal place precision


	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'ps2maps:census';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Connect to Census API.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->monolog = new Logger('CENSUS');
		$this->monolog->pushHandler(new StreamHandler(storage_path().'/logs/census.log', Logger::INFO));

		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
		if ( $this->option('sync') )
			$this->verb = "Syncing";

		// Run
		$methods = [];
		foreach( $this->option() as $option => $value ) {
			if ( method_exists($this, $option) and ( $value == true or $this->option('all') ) ) {
				$methods[] = $option;
			}
		}
		// Reorder facilities so it runs after facility types
		if ( in_array('facility_types', $methods) and in_array('facilities', $methods) ) {
			$key = array_search('facilities', $methods);
			unset($methods[$key]);
			$methods[] = 'facilities';
		}
		foreach( $methods as $method )
			$this->$method();
	}

	private function log($message, $extra=array())
	{
		if ( $this->option('verbose') ) {
			$this->info($message." ".json_encode($extra));
		}

		$this->monolog->addNotice($message, $extra);
	}

	// Sync Continents
	private function continents()
	{
		$class = get_class(new Continent);
		$this->log($this->verb.' Continents');

		$url = $this->baseUrl . "zone?c:limit=100";
		$data = $this->getCensusData($url);
		if ( !$data )
			return false;

		// Collection of Eloquent objects from API
		$apiCollection = new Collection();
		foreach( $data->zone_list as $continent ) {
			$values = [];
			$values['id'] = isset($continent->zone_id) ? $continent->zone_id : null;
			$values['name'] = isset($continent->name->en) ? $continent->name->en : null;
			$values['slug'] = isset($continent->name->en) ? Str::camel($continent->name->en) : null;
			$values['description'] = isset($continent->description->en) ? $continent->description->en : null;
			$apiCollection->add(new Continent($values));
		}

		$servers = Continent::all();

		$this->addModels($class, $servers, $apiCollection);
		$this->deleteModels($class, $servers, $apiCollection);
		$this->updateModels($class, Continent::all(), $apiCollection, ['name','slug']);
	}

	// Sync Servers
	private function servers()
	{
		$class = get_class(new Server);
		$this->log($this->verb.' Servers');

		$url = $this->baseUrl . "world?c:limit=100";
		$data = $this->getCensusData($url);
		if ( !$data )
			return false;

		// Collection of Eloquent objects from API
		$apiCollection = new Collection();
		foreach( $data->world_list as $server ) {
			$values = [];
			$values['id'] = isset($server->world_id) ? $server->world_id : null;
			$values['name'] = isset($server->name->en) ? $server->name->en : null;
			$values['slug'] = isset($server->name->en) ? Str::camel($server->name->en) : null;
			$apiCollection->add(new Server($values));
		}

		$servers = Server::all();

		$this->addModels($class, $servers, $apiCollection);
		$this->deleteModels($class, $servers, $apiCollection);
		$this->updateModels($class, Server::all(), $apiCollection, ['name','slug']);
	}

	// Sync Factions
	private function factions()
	{
		$class = get_class(new Faction);
		$this->log($this->verb.' Factions');

		$url = $this->baseUrl . "faction?c:limit=100";
		$data = $this->getCensusData($url);
		if ( !$data )
			return false;

		// Collection of Eloquent objects from API
		$apiCollection = new Collection();
		foreach( $data->faction_list as $faction ) {
			$values = [];
			$values['id'] = isset($faction->faction_id) ? $faction->faction_id : null;
			$values['name'] = isset($faction->name->en) ? $faction->name->en : null;
			$values['slug'] = isset($faction->name->en) ? Str::camel($faction->name->en) : null;
			$apiCollection->add(new Faction($values));
		}

		// Local factions
		$factions = Faction::all();

		$this->addModels($class, $factions, $apiCollection);
		$this->deleteModels($class, $factions, $apiCollection);
		$this->updateModels($class, Faction::all(), $apiCollection, ['name','slug']);
	}

	// Sync Facility Types
	private function facility_types()
	{
		$class = get_class(new FacilityType);
		$this->log($this->verb.' Facility Types');

		$url = $this->baseUrl . "facility_type?c:limit=100";
		$data = $this->getCensusData($url);
		if ( !$data )
			return false;

		// Collection of Eloquent objects from API
		$apiCollection = new Collection();
		foreach( $data->facility_type_list as $type ) {
			$values = [];
			$values['id'] = isset($type->facility_type_id) ? $type->facility_type_id : null;
			$values['name'] = isset($type->description) ? $type->description : null;
			$values['slug'] = isset($type->description) ? Str::camel($type->description) : null;
			$apiCollection->add(new FacilityType($values));
		}

		$facilityTypes = FacilityType::all();

		$this->addModels($class, $facilityTypes, $apiCollection);
		$this->deleteModels($class, $facilityTypes, $apiCollection);
		$this->updateModels($class, FacilityType::all(), $apiCollection, ['name','slug']);
	}

	// Sync Facilities
	private function facilities()
	{
		$class = get_class(new Facility);
		$this->log($this->verb.' Facilities');

		$url = $this->baseUrl . "map_region?c:limit=1000";
		$data = $this->getCensusData($url);
		if ( !$data )
			return false;

		// Collection of Eloquent objects from API
		$apiCollection = new Collection();
		foreach( $data->map_region_list as $facility ) {
			$values = [];
			$values['id'] = isset($facility->facility_id) ? $facility->facility_id : null;
			$values['name'] = isset($facility->facility_name) ? $facility->facility_name : null;
			$values['slug'] = isset($facility->facility_name) ? Str::camel($facility->facility_name) : null;
			$values['continent_id'] = isset($facility->zone_id) ? $facility->zone_id : null;
			$values['facility_type_id'] = isset($facility->facility_type_id) ? $facility->facility_type_id : null;
			$values['region_id'] = isset($facility->map_region_id) ? $facility->map_region_id : null;
			$values['currency_amount'] = isset($facility->reward_amount) ? $facility->reward_amount : null;
			$values['currency_id'] = isset($facility->reward_currency_id) ? $facility->reward_currency_id : null;

			$values['lat'] = isset($facility->location_z) ? $facility->location_z * $this->latScale + $this->latOffset : null;
			$values['lng'] = isset($facility->location_x) ? $facility->location_x * $this->lngScale + $this->lngOffset : null;
			$values['elevation'] = isset($facility->location_z) ? $facility->location_y * $this->elevationScale + $this->elevationOffset : null;

			$facility = new Facility($values);

			// Add facility type names to facilities
			if ( in_array($facility->facilityType->name, ['Amp Station', 'Bio Lab', 'Interlink Facility', 'Tech Plant']) ) {
				$facility->name .= " ".$facility->facilityType->name;
				$facility->slug = Str::camel($facility->name);
			}

			$apiCollection->add($facility);
		}

		$facilities = Facility::all();

		$this->addModels($class, $facilities, $apiCollection);
		$this->deleteModels($class, $facilities, $apiCollection);
		$compare = [
			'name',
			'slug',
			'continent_id',
			'facility_type_id',
			'region_id',
			'lat',
			'lng',
			'elevation',
			'currency_amount',
			'currency_id',
		];
		$this->updateModels($class, Facility::all(), $apiCollection, $compare);
	}

	// Sync Currencies
	private function currencies()
	{
		$class = get_class(new Currency);
		$this->log($this->verb.' Currencies');

		$url = $this->baseUrl . "currency?c:limit=100";
		$data = $this->getCensusData($url);
		if ( !$data )
			return false;

		// Collection of Eloquent objects from API
		$apiCollection = new Collection();
		foreach( $data->currency_list as $currency ) {
			$values = [];
			$values['id'] = isset($currency->currency_id) ? $currency->currency_id : null;
			$values['name'] = isset($currency->name->en) ? $currency->name->en : null;
			$apiCollection->add(new Currency($values));
		}

		$currencies = Currency::all();

		$this->addModels($class, $currencies, $apiCollection);
		$this->deleteModels($class, $currencies, $apiCollection);
		$this->updateModels($class, Currency::all(), $apiCollection, ['name']);
	}

	// Sync Regions
	private function regions()
	{
		$class = get_class(new Region);
		$this->log($this->verb.' Regions');

		$url = $this->baseUrl . "region?c:limit=1000";
		$data = $this->getCensusData($url);
		if ( !$data )
			return false;

		// Collection of Eloquent objects from API
		$apiCollection = new Collection();
		foreach( $data->region_list as $region ) {
			$values = [];
			$values['id'] = isset($region->region_id) ? $region->region_id : null;
			$values['name'] = isset($region->name->en) ? $region->name->en : null;
			$values['continent_id'] = isset($region->zone_id) ? $region->zone_id : null;
			$apiCollection->add(new Region($values));
		}

		$regions = Region::all();

		$this->addModels($class, $regions, $apiCollection);
		$this->deleteModels($class, $regions, $apiCollection);
		$this->updateModels($class, Region::all(), $apiCollection, ['name','continent_id']);
	}

	// Sync Hexes
	private function hexes()
	{
		$class = get_class(new Hex);
		$this->log($this->verb.' Hexes');

		$url = $this->baseUrl . "map_hex?c:limit=10000";
		$data = $this->getCensusData($url);
		if ( !$data )
			return false;

		// Collection of Eloquent objects from API
		$apiCollection = new Collection();
		foreach( $data->map_hex_list as $hex ) {
			$values = [];
			$values['region_id'] = isset($hex->map_region_id) ? $hex->map_region_id : null;
			$values['x'] = isset($hex->x) ? $hex->x : null;
			$values['y'] = isset($hex->y) ? $hex->y : null;
			$apiCollection->add(new Hex($values));
		}

		$regions = Hex::all();

		$this->addModels($class, $regions, $apiCollection);
		$this->deleteModels($class, $regions, $apiCollection);
	}

	// Sync Links
	private function links()
	{
		$class = get_class(new Link);
		$this->log($this->verb.' Links');

		$url = $this->baseUrl . "facility_link?c:limit=1000";
		$data = $this->getCensusData($url);
		if ( !$data )
			return false;

		// Collection of Eloquent objects from API
		$apiCollection = new Collection();
		foreach( $data->facility_link_list as $link ) {
			$values = [];
			$values['name'] = isset($link->description) ? $link->description : null;
			$values['facility_id_a'] = isset($link->facility_id_a) ? $link->facility_id_a : null;
			$values['facility_id_b'] = isset($link->facility_id_b) ? $link->facility_id_b : null;
			$apiCollection->add(new Link($values));
		}

		$links = Link::all();

		$this->addModels($class, $links, $apiCollection);
		$this->deleteModels($class, $links, $apiCollection);
	}

	// Generic method for fetching Census API data
	private function getCensusData($url)
	{
		$this->log("    Getting Census Data");
		// Connect to Census
		try {
			$data = json_decode(file_get_contents($url));
		} catch (Exception $e) {
			$this->log('Error connecting to Census', array('exception'=>$e, 'url'=>$url));
			return false;
		}

		// Handle API Errors
		if ( isset($data->error) ) {
			$this->log('API Error', array('error'=>$data->error, 'url'=>$url));
			return false;
		}

		return $data;
	}

	private function addModels($class, $localCollection, $apiCollection)
	{
		// Get the model's table
		$object = new $class;
		$table = $object->getTable();
		unset($object);

		$timestamp = (new Carbon)->toDateTimeString();

		$data = [];
		foreach( $apiCollection->diff($localCollection) as $model ) {
			$tmp = $model->getAttributes();
			$tmp['created_at'] = $timestamp;
			$tmp['updated_at'] = $timestamp;
			$data[] = $tmp;
		}

		if ( count($data) > 0 and ( $this->option('sync') or $this->option('add') ) ) {
			foreach( $data as $d ) {
				$this->log('    Adding '.$class, $d);
			}
			DB::table($table)->insert($data);
		} else {
			foreach( $data as $d ) {
				$this->log('    '.$class.' not found locally', $d);
			}
		}

	}

	private function deleteModels($class, $localCollection, $apiCollection)
	{
		foreach( $localCollection->diff($apiCollection) as $model ) {
			if ( $this->option('sync') or $this->option('delete') ) {
				$this->log('    Deleting '.$class, $model->toArray());
				$model->delete();
			} else {
				$this->log('    '.$class.' not found in Census', $model->toArray());
			}
		}
	}

	private function updateModels($class, $localCollection, $apiCollection, $comparisonAttributes)
	{
		$apiCollection = $apiCollection->getDictionary();

		foreach( $localCollection as $model ) {

			foreach( $comparisonAttributes as $attr ) {
				if ( isset($apiCollection[$model->id]) )
					$model[$attr] = $apiCollection[$model->id][$attr];
			}

			$dirty = $model->getDirty();
			if ( count($dirty) > 0 ) {

				// Build array showing old and new attribute values
				$diff = ['id' => $model->id];
				foreach( $dirty as $key => $attr ) {
					$diff[$key]['old'] = $model->getOriginal()[$key];
					$diff[$key]['new'] = $model->getAttributes()[$key];
				}

				if ( $this->option('sync') or $this->option('update') ) {
					$model->save();
					$this->log('    Updating '.$class, $diff);
				} else {
					$this->log('    '.$class.' mismatch', $diff);
				}

			}

		}
	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return array();
	}

	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		return array(
			// Assets to Compare/Sync
			array('continents', null, InputOption::VALUE_NONE, 'Compare continents.', null),
			array('currencies', null, InputOption::VALUE_NONE, 'Compare currencies.', null),
			array('factions', null, InputOption::VALUE_NONE, 'Compare factions.', null),
			array('facilities', null, InputOption::VALUE_NONE, 'Compare facilities.', null),
			array('facility_types', null, InputOption::VALUE_NONE, 'Compare facility types.', null),
			array('hexes', null, InputOption::VALUE_NONE, 'Compare map hexes.', null),
			array('links', null, InputOption::VALUE_NONE, 'Compare facility links.', null),
			array('regions', null, InputOption::VALUE_NONE, 'Compare map regions.', null),
			array('servers', null, InputOption::VALUE_NONE, 'Compare servers.', null),

			// All Assets
			array('all', null, InputOption::VALUE_NONE, 'Compare all assets.', null),

			// Actions
			array('sync', null, InputOption::VALUE_NONE, 'Add, Delete & Update assets.', null),
		);
	}

}
