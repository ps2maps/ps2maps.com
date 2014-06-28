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

			$table->integer('continent_id')->unsigned()->nullable();
			$table->integer('facility_type_id')->unsigned()->nullable();
			$table->integer('region_id')->unsigned()->nullable();

			$table->decimal('x')->nullable();
			$table->decimal('y')->nullable();
			$table->decimal('z')->nullable();

			$table->integer('currency_amount')->unsigned()->nullable();
			$table->integer('currency_id')->unsigned()->nullable();

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
