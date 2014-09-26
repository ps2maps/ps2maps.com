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
		<div class='col-xs-12'>
			<h2>Settings</h2>
			<hr>
		</div>

		<div class='col-ms-4 col-sm-4'>

			<h4>Faction Colors</h4>

			<div class="form-group">
				<label for="nc-color">New Conglomerate</label>
				<input id="nc-color" name="nc-color" type="hidden" class="minicolors" value="{{ Session::get('faction-colors.nc.default', Config::get('ps2maps.faction-colors.nc.default')) }}" size="7"/>
			</div>

			<div class="form-group">
				<label for="nc-color">Terran Republic</label>
				<input id="tr-color" name="tr-color" type="hidden" class="minicolors" value="{{ Session::get('faction-colors.tr.default', Config::get('ps2maps.faction-colors.tr.default')) }}" size="7">
			</div>

			<div class="form-group">
				<label for="nc-color">Vanu Soverignty</label>
				<input id="vs-color" name="vs-color" type="hidden" class="minicolors" value="{{ Session::get('faction-colors.vs.default', Config::get('ps2maps.faction-colors.vs.default')) }}" size="7">
			</div>

			<p>
				<button class='btn btn-xs btn-info default-colors' type='button'>Restore Defaults</button>
			</p>

			<hr>

			<h4>Time Format</h4>
			<div class="form-group">
				<label class="radio-inline">
					<input type="radio" name="time-format" id="time-format-12" value="12" @if( Session::get('time-format') == '12' ) checked @endif> 12 hr
				</label>
				<label class="radio-inline">
					<input type="radio" name="time-format" id="time-format-24" value="24" @if( Session::get('time-format') == '24' ) checked @endif> 24 hr
				</label>
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
<link href="/js/jquery-minicolors/jquery.minicolors.css" media="all" type="text/css" rel="stylesheet">
<style>
body { background-color: inherit; }
</style>
@append

@section('scripts')
<script src="/js/jquery-minicolors/jquery.minicolors.min.js"></script>
@append


@section('javascript')


@append

@section('jquery')
$('input.minicolors').minicolors({theme:'bootstrap'});

setTimeout(function(){
$('.alert').alert('close');
}, 5000);

$('button.default-colors').on('click', function(){
$('#nc-color').minicolors('value', "{{ Config::get('ps2maps.faction-colors.nc.default') }}");
$('#tr-color').minicolors('value', "{{ Config::get('ps2maps.faction-colors.tr.default') }}");
$('#vs-color').minicolors('value', "{{ Config::get('ps2maps.faction-colors.vs.default') }}");
});
@append
