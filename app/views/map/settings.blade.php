@extends('templates/default')

@section('content')

<div class='container-fluid'>
	{{ Form::open() }}

		@if ( Session::has('message') )
		<div class='row settings-flash-message'>
			<div class='col-sm-6 col-sm-offset-3'>
				<div class="alert alert-info alert-dismissible fade in" role="alert">
				  <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				  Settings Successfully Saved.
				</div>
			</div>
		</div>
		@endif

		<div class='row'>

				<div class='col-ms-4 col-sm-4'>
					<h2>Settings</h2>

					<div class="form-group">
						<label for="nc-color">New Conglomerate color</label>
						<div class="input-group color-picker">
							<input id="nc-color" name="nc-color" type="text" value="{{ Session::get('faction-colors.nc', Config::get('ps2maps.faction-colors.nc')) }}" class="form-control" />
							<span class="input-group-addon"><i></i></span>
						</div>
					</div>

					<div class="form-group">
						<label for="tr-color">Terran Republic color</label>
						<div class="input-group color-picker">
							<input id="tr-color" name="tr-color" type="text" value="{{ Session::get('faction-colors.tr', Config::get('ps2maps.faction-colors.tr')) }}" class="form-control" />
							<span class="input-group-addon"><i></i></span>
						</div>
					</div>

					<div class="form-group">
						<label for="vs-color">Vanu Soverignty color</label>
						<div class="input-group color-picker">
							<input id="vs-color" name="vs-color" type="text" value="{{ Session::get('faction-colors.vs', Config::get('ps2maps.faction-colors.vs')) }}" class="form-control" />
							<span class="input-group-addon"><i></i></span>
						</div>
					</div>

				</div>
				<div class='col-ms-8 col-sm-8'>

				</div>
		</div>
		<div class='row'>
			<div class='col-sm-12'>
				<button type='submit' class='btn btn-success'>Save Settings</button>
			</div>
		</div>
	{{ Form::close() }}
</div>
@stop

@section('head')
	<link href="/css/bootstrap-colorpicker.min.css" media="all" type="text/css" rel="stylesheet">
	<style>
		body { background-color: inherit; }
	</style>
@append

@section('scripts')
		<script src="/js/bootstrap-colorpicker.min.js"></script>
@append


@section('javascript')


@append

@section('jquery')
	$('.color-picker').colorpicker();
	setTimeout(function(){
		$('.alert').alert('close');
	}, 5000);
@append
