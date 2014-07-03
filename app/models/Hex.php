<?php

class Hex extends Eloquent
{
	public $table = 'hexes';

	public $incrementing = false;

	public $fillable = array(
		'region_id',
		'x',
		'y',
	);

	public function region()
	{
		return $this->belongsTo('Region');
	}
}
