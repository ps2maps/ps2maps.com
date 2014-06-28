<?php

class Server extends Eloquent
{
	public $incrementing = false;

	public $fillable = array(
		'id',
		'name',
		'slug',
		'status',
	);
}
