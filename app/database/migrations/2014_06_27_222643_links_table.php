<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class LinksTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::dropIfExists('links');
		Schema::create('links', function(Blueprint $table)
		{
			$table->string('name')->nullable();
			$table->integer('facility_id_a')->unsigned()->nullable();
			$table->integer('facility_id_b')->unsigned()->nullable();

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
		Schema::dropIfExists('links');
	}

}
