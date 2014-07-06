<?php

// Servers and Continents
Route::get('{server}/{continent}', 'ServerController@continent');
Route::get('{server}', 'ServerController@server');

// Embedded maps
Route::get('embed/{server}/{continent}', 'ServerController@embed');

// Blog
Route::get('blog/rss', 'BlogController@rss');
Route::get('blog/{slug}', 'BlogController@article');
Route::get('blog', 'BlogController@index');

// Home
Route::get('/', 'HomeController@getIndex');


