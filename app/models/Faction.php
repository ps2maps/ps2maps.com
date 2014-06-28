<?php

class Faction extends Eloquent
{
	public $incrementing = false;

	public $fillable = array(
		'id',
		'name',
		'slug',
	);
}
