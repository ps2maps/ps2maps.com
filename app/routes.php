<?php

// Blog
Route::get('blog/rss', 'BlogController@rss');
Route::get('blog/{slug}', 'BlogController@article');
Route::get('blog', 'BlogController@index');

// Settings
Route::get('settings', 'PageController@getSettings');
Route::post('settings', 'PageController@postSettings');

// Servers and Continents
// Route::get('embed/{server}/{continent}', 'ServerController@embed');
// Route::get('lock-status/{server_id}/{continent_id}', 'ServerController@isLocked');
Route::get('{server}/{continent}', 'ServerController@continent');
Route::get('{server}', 'ServerController@server');

// Home
Route::get('/', 'HomeController@getIndex');


