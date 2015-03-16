<?php

Class Post extends Eloquent
{
	public $fillable = array(
		'title',
		'content',
		'image',
		'slug',
		'published',
		'published_at'
	);

	public function getDates()
	{
		return ['created_at','updated_at','published_at'];
	}

}
