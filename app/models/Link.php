<?php

class Link extends Eloquent
{
	public $incrementing = false;

	public $fillable = array(
		'name',
		'facility_id_a',
		'facility_id_b',
	);
}
