<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class HexesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::dropIfExists('hexes');
		Schema::create('hexes', function(Blueprint $table)
		{
			$table->integer('region_id')->unsigned()->nullable();
			$table->integer('x')->nullable();
			$table->integer('y')->nullable();

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('hexes');
	}

}
