<?php

class Server extends Eloquent
{
	public $fillable = array(
		'name',
		'census_server_id',
		'status'
	);

	public static function getAll()
	{
		return Cache::get('servers/all', function()
		{
			$servers = Server::where_enabled('yes')
				->order_by('name')
				->get();

			if ( empty($servers) )
				return $servers;

			// Cache Result
			Cache::put('servers/all', $servers, 1440);

			return $servers;
		});
	}

	public function getOtherServers()
	{
		$server = $this;

		return Cache::get('servers/all_except_'.$this->slug, function() use ($server)
		{
			$servers = Server::where_enabled('yes')
							->where('id','!=',$server->id)
							->order_by('name')
							->get();

			if ( empty($servers) )
				return $servers;

			Cache::put('servers/all_except_'.$server->slug, $servers, 1440);

			return $servers;
		});
	}
}
