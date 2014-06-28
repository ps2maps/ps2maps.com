<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ContinentsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::dropIfExists('continents');
		Schema::create('continents', function(Blueprint $table)
		{
			$table->integer('id')->unsigned();
			$table->string('name')->nullable();
			$table->string('slug')->nullable();
			$table->string('description')->nullable();
			$table->enum('enabled',array('yes','no'));

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
		Schema::dropIfExists('continents');
	}

}
