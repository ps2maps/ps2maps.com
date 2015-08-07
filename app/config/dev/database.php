<?php

return array(

	'connections' => array(
		'mysql' => array(
			'driver'    => 'mysql',
			'host'      => $_ENV['database_host'],
			'database'  => $_ENV['database_database'],
			'username'  => $_ENV['database_username'],
			'password'  => $_ENV['database_password'],
			'charset'   => 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix'    => '',
		),
	),
);
