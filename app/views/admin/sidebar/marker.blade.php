<div class="accordion-group">
	<div class="accordion-heading">
		<a class="accordion-toggle" id='collapseMarkerButton' data-toggle='collapse' href="#collapseEditMarker">
			Edit Marker
		</a>
	</div>
	<div id="collapseEditMarker" class="accordion-body collapse">
		<div class="accordion-inner layer-toggle layer-checkboxes">

			<label>id</label>
			<input type='text' id='marker_id' class='input-block-level' disabled='disabled'/>

			<label>type</label>
			{{ Form::select('marker_type_id', MarkerType::order_by('name')->lists('name','id'), null, array('class'=>'input-block-level', 'id'=>'marker_type_id')) }}

			<label>text</label>
			<input type='text' id='marker-text' class='input-block-level'/>

			<label>latitude</label>
			<input type='text' id='marker-lat' class='input-block-level'/>

			<label>longitude</label>
			<input type='text' id='marker-lng' class='input-block-level'/>

			<button type="button" id='marker-drag-toggle' class="btn btn-warning btn-block" data-toggle="button">Draggable: On</button>
			<button type="button" id='marker-save' class="btn btn-success btn-block">Save Marker</button>
			<button type="button" id='marker-delete' class="btn btn-danger btn-block">Delete Marker</button>

		</div>
	</div>
</div>

<div class="accordion-group">
	<div class="accordion-heading">
		<a class="accordion-toggle" id='collapseMarkerButton' data-toggle='collapse' href="#collapseCreateMarker">
			Create Marker
		</a>
	</div>
	<div id="collapseCreateMarker" class="accordion-body collapse">
		<div class="accordion-inner layer-toggle layer-checkboxes">

			<label>type</label>
			{{ Form::select('marker_create_type_id', MarkerType::order_by('name')->lists('name','id'), null, array('class'=>'input-block-level', 'id'=>'marker_create_type_id')) }}

			<button type="button" id='marker-create' class="btn btn-success btn-block">Create Marker</button>

		</div>
	</div>
</div>
