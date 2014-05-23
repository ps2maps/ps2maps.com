<div id='sidebar' class=''>

	<div id='sidebar_content'>

		<div class="accordion">

			<div class="accordion-group">
				<div class="accordion-heading">
					<a class="accordion-toggle" id='collapseMarkerButton' data-toggle='collapse' href="#collapseTerritory">
						Territory
					</a>
				</div>
				<div id="collapseTerritory" class="accordion-body collapse">
					<div class="accordion-inner">

						<label>territory</label>

						{{ Form::select('marker_type_id', $territoryList, null, array('class'=>'input-block-level', 'id'=>'territory_id')) }}

						<button type="button" id='highlight' class="btn btn-warning btn-block">Highlight</button>
						<button type="button" id='clear' class="btn btn-danger btn-block" onclick='resetGrid()'>Clear</button>
						<button type="button" id='save' class="btn btn-success btn-block">Save</button>

						<label>new territory</label>

						{{ Form::text('new_territory_id', null, array('class'=>'input-block-level', 'id'=>'new_territory_id', 'placeholder'=>'ID'))}}

						{{ Form::text('new_territory_name', null, array('class'=>'input-block-level', 'id'=>'new_territory_name', 'placeholder'=>'Name'))}}
						<button type="button" id='create' class="btn btn-success btn-block">Create</button>

					</div>
				</div>
			</div>

		</div>
	</div>

	<a href='javascript:;' id='sidebar_handle'>
		<span id='handle'></span>
	</a>

</div>
