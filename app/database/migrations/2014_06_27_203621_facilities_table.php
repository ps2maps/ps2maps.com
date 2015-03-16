<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FacilitiesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::dropIfExists('facilities');
		Schema::create('facilities', function(Blueprint $table)
		{
			$table->integer('id')->unsigned();
			$table->string('name')->nullable();
			$table->string('slug')->nullable();

			$table->enum('enabled', ['yes','no'])->default('yes');

			$table->integer('continent_id')->unsigned()->nullable();
			$table->integer('facility_type_id')->unsigned()->nullable();
			$table->integer('region_id')->unsigned()->nullable();

			$table->integer('currency_amount')->unsigned()->nullable();
			$table->integer('currency_id')->unsigned()->nullable();

			$table->decimal('lat')->nullable();
			$table->decimal('lng')->nullable();
			$table->decimal('elevation')->nullable();

			$table->decimal('lat_override')->nullable();
			$table->decimal('lng_override')->nullable();
			$table->decimal('elevation_override')->nullable();

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
		Schema::dropIfExists('facilities');
	}

}
