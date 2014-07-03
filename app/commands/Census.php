<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Illuminate\Database\Eloquent\Collection;

class Census extends Command {

	private $baseUrl = "http://census.soe.com/s:ps2maps/get/ps2:v2/";
	private $log;
	private $verb = 'Comparing';

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
	protected $description = 'Connect to Census API';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->log = new Logger('CENSUS');
		$this->log->pushHandler(new StreamHandler(storage_path().'/logs/census.log', Logger::INFO));

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
		foreach( $this->option() as $option => $value ) {
			if ( method_exists($this, $option) and ( $value == true or $this->option('all') ) ) {
				$this->$option();
			}
		}
	}

	// Sync Continents
	private function continents()
	{
		$name = 'Continent';
		$this->log->addInfo($this->verb.' Continents');

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
			$values['slug'] = isset($continent->name->en) ? Str::slug($continent->name->en) : null;
			$values['description'] = isset($continent->description->en) ? $continent->description->en : null;
			$apiCollection->add(new Continent($values));
		}

		$servers = Continent::all();

		$this->addModels($name, $servers, $apiCollection);
		$this->deleteModels($name, $servers, $apiCollection);
		$this->updateModels($name, Continent::all(), $apiCollection, ['name','slug']);
	}

	// Sync Servers
	private function servers()
	{
		$name = 'Server';
		$this->log->addInfo($this->verb.' Servers');

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
			$values['slug'] = isset($server->name->en) ? Str::slug($server->name->en) : null;
			$apiCollection->add(new Server($values));
		}

		$servers = Server::all();

		$this->addModels($name, $servers, $apiCollection);
		$this->deleteModels($name, $servers, $apiCollection);
		$this->updateModels($name, Server::all(), $apiCollection, ['name','slug']);
	}

	// Sync Factions
	private function factions()
	{
		$name = 'Faction';
		$this->log->addInfo($this->verb.' Factions');

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
			$values['slug'] = isset($faction->name->en) ? Str::slug($faction->name->en) : null;
			$apiCollection->add(new Faction($values));
		}

		// Local factions
		$factions = Faction::all();

		$this->addModels($name, $factions, $apiCollection);
		$this->deleteModels($name, $factions, $apiCollection);
		$this->updateModels($name, Faction::all(), $apiCollection, ['name','slug']);
	}

	// Sync Facility Types
	private function facilityTypes()
	{
		$name = 'Facility Type';
		$this->log->addInfo($this->verb.' Facility Types');

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
			$values['slug'] = isset($type->description) ? Str::slug($type->description) : null;
			$apiCollection->add(new FacilityType($values));
		}

		$facilityTypes = FacilityType::all();

		$this->addModels($name, $facilityTypes, $apiCollection);
		$this->deleteModels($name, $facilityTypes, $apiCollection);
		$this->updateModels($name, FacilityType::all(), $apiCollection, ['name','slug']);
	}

	// Sync Facilities
	private function facilities()
	{
		$name = 'Facility';
		$this->log->addInfo($this->verb.' Facilities');

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
			$values['slug'] = isset($facility->facility_name) ? Str::slug($facility->facility_name) : null;
			$values['continent_id'] = isset($facility->zone_id) ? $facility->zone_id : null;
			$values['facility_type_id'] = isset($facility->facility_type_id) ? $facility->facility_type_id : null;
			$values['region_id'] = isset($facility->map_region_id) ? $facility->map_region_id : null;
			$values['x'] = isset($facility->location_x) ? $facility->location_x : null;
			$values['y'] = isset($facility->location_y) ? $facility->location_y : null;
			$values['z'] = isset($facility->location_z) ? $facility->location_z : null;
			$values['currency_amount'] = isset($facility->reward_amount) ? $facility->reward_amount : null;
			$values['currency_id'] = isset($facility->reward_currency_id) ? $facility->reward_currency_id : null;
			$apiCollection->add(new Facility($values));
		}

		$facilities = Facility::all();

		$this->addModels($name, $facilities, $apiCollection);
		$this->deleteModels($name, $facilities, $apiCollection);
		$compare = [
			'name',
			'slug',
			'continent_id',
			'facility_type_id',
			'region_id',
			'x',
			'y',
			'z',
			'currency_amount',
			'currency_id',
		];
		$this->updateModels($name, Facility::all(), $apiCollection, $compare);
	}

	// Sync Currencies
	private function currencies()
	{
		$name = 'Currency';
		$this->log->addInfo($this->verb.' Currencies');

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

		$this->addModels($name, $currencies, $apiCollection);
		$this->deleteModels($name, $currencies, $apiCollection);
		$this->updateModels($name, Currency::all(), $apiCollection, ['name']);
	}

	// Sync Regions
	private function regions()
	{
		$name = 'Region';
		$this->log->addInfo($this->verb.' Regions');

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

		$this->addModels($name, $regions, $apiCollection);
		$this->deleteModels($name, $regions, $apiCollection);
		$this->updateModels($name, Region::all(), $apiCollection, ['name','continent_id']);
	}

	// Sync Hexes
	private function hexes()
	{
		$name = 'Hex';
		$this->log->addInfo($this->verb.' Hexes');

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

		$this->addModels($name, $regions, $apiCollection);
		$this->deleteModels($name, $regions, $apiCollection);
	}

	// Sync Links
	private function links()
	{
		$name = 'Link';
		$this->log->addInfo($this->verb.' Links');

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

		$this->addModels($name, $links, $apiCollection);
		$this->deleteModels($name, $links, $apiCollection);
	}

	// Generic method for fetching Census API data
	private function getCensusData($url)
	{
		// Connect to Census
		try {
			$data = json_decode(file_get_contents($url));
		} catch (Exception $e) {
			$this->log->addError('Error connecting to Census', array('exception'=>$e, 'url'=>$url));
			return false;
		}

		// Handle API Errors
		if ( isset($data->error) ) {
			$this->log->addError('API Error', array('error'=>$data->error, 'url'=>$url));
			return false;
		}

		return $data;
	}

	private function addModels($name, $localCollection, $apiCollection)
	{
		foreach( $apiCollection->diff($localCollection) as $model ) {
			if ( $this->option('sync') or $this->option('add') ) {
				$model->save();
				$this->log->addNotice('Adding '.$name, $model->toArray());
			} else {
				$this->log->addNotice($name.' not found locally', $model->toArray());
			}
		}
	}

	private function deleteModels($name, $localCollection, $apiCollection)
	{
		foreach( $localCollection->diff($apiCollection) as $model ) {
			if ( $this->option('sync') or $this->option('delete') ) {
				$this->log->addNotice('Deleting '.$name, $model->toArray());
				$model->delete();
			} else {
				$this->log->addNotice($name.' not found in Census', $model->toArray());
			}
		}
	}

	private function updateModels($name, $localCollection, $apiCollection, $comparisonAttributes)
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
					$this->log->addNotice('Updating '.$name, $diff);
				} else {
					$this->log->addNotice($name.' mismatch', $diff);
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
			array('add', null, InputOption::VALUE_NONE, 'Add missing assets from Census.', null),
			array('delete', null, InputOption::VALUE_NONE, "Delete assets that are not in Census.", null),
			array('update', null, InputOption::VALUE_NONE, 'Update assets that differ from Census.', null),
			array('sync', null, InputOption::VALUE_NONE, 'Add, Delete & Update assets.', null),
		);
	}

}
