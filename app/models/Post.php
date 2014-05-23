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
}
