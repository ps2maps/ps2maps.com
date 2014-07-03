<?php

class Region extends Eloquent
{
	public $incrementing = false;

	public $fillable = array(
		'id',
		'name',
		'continent_id',
	);

	public function hexes()
	{
		return $this->hasMany('Hex');
	}

	public function facility()
	{
		return $this->hasOne('Facility');
	}
}
