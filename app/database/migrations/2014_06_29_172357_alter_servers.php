<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterServers extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('servers', function(Blueprint $table)
		{
			$table->enum('enabled',['yes','no'])->default('no')->after('status');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('servers', function(Blueprint $table)
		{
			$table->dropColumn('enabled');
		});
	}

}
