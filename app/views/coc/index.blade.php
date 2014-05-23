@layout('template')

@section('content')

<div class='container'>

	<div class='row'>

		<div class='span6'>
			<div class='visible-desktop visible-tablet'>
				<h2>{{ $server->name }}</h2>
				Combat Operations Center
			</div>
			<h3 class='visible-phone center'>{{ $server->name }} - COC</h3>
		</div>

		<div class='span6 right' id='social-container'>
			@include('social')
		</div>
	</div>

	<hr>

	@foreach( $continents as $continent )

	<div class='row'>

		<div class='span12'>
			<h4>{{ $continent->name }} Territory Control</h4>
			<div id='{{ $continent->slug }}_territoryControl'></div>
		</div>
	</div>

	@endforeach

</div>

@endsection

@section('javascript-head')
var server = { id: {{$server->id}}, name: "{{$server->name}}", slug: "{{$server->slug}}" };
@endsection

@section('javascript')

@endsection
