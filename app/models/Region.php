<?php

class Region extends Eloquent
{
	public $incrementing = false;

	public $fillable = array(
		'id',
		'name',
		'continent_id',
	);
}
