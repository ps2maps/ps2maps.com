<?php

// Route::group(['before'=>'auth'], function(){
// 	Route::controller('admin', 'AdminController');
// });

// Fetch search sources
Route::post('searchSources', 'PageController@postSearchSources');

// Route::get('donate', function(){
// 	return View::make('donate');
// });
//
// Route::get('test', function(){
// 	return View::make('embed_test');
// });

// Embedding instructions
Route::get('embeddable', 'PageController@getEmbeddable');

// Settings
Route::get('settings', 'PageController@getSettings');
Route::post('settings', 'PageController@postSettings');

// Servers and Continents
Route::get('{server}/{continent}/embed', 'MapController@embed');
Route::get('{server}/{continent}', 'MapController@continent');
Route::get('{server}', 'MapController@server');



// Home
Route::get('/', 'PageController@getIndex');


