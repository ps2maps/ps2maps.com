<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

// Route::post('ajax/region-control', 'ajax@region_control');

Route::controller('blog', 'BlogController');

Route::get('/', 'HomeController@getIndex');

