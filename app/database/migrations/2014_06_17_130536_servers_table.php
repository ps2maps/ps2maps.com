<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ServersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::dropIfExists('servers');
		Schema::create('servers', function(Blueprint $table)
		{
			$table->integer('id')->unsigned();
			$table->string('name')->nullable();
			$table->string('slug')->nullable();
			$table->string('status')->nullable();

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
		Schema::dropIfExists('servers');
	}

}
