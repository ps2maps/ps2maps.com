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
}
