<?php

class Currency extends Eloquent
{
	public $incrementing = false;

	public $fillable = array(
		'id',
		'name',
	);

	public function facilities()
	{
		return $this->hasMany('Facility');
	}
}
