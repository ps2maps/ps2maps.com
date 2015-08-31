<?php

// Fetch search sources
Route::post('searchSources', 'PageController@postSearchSources');

// Embedding instructions
Route::get('embeddable', 'PageController@getEmbeddable');

Route::get('donate', function(){
	return View::make('donate');
});

// Settings
Route::get('settings', 'PageController@getSettings');
Route::post('settings', 'PageController@postSettings');

// Servers and Continents
Route::get('{server}/{continent}/embed', 'MapController@embed');
Route::get('{server}/{continent}', 'MapController@continent');
Route::get('{server}', 'MapController@server');

// Home
Route::get('/', 'PageController@getIndex');
