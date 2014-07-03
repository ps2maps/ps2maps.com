<?php

class Continent extends Eloquent
{
	public $incrementing = false;

	public $fillable = array(
		'id',
		'name',
		'slug',
		'description',
		'enabled',
	);

	public function regions()
	{
		return $this->hasMany('Region');
	}

	public function facilities()
	{
		return $this->hasMany('Facility');
	}
}
