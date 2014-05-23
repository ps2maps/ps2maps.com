@layout('template')

@section('content')

<div class='container'>

	{{ Form::open('/admin/fetchTerritoryControl') }}
	{{ Form::token() }}

	<button type='submit' class='btn btn-primary'>Fetch Territory Control</button>

	{{ Form::close() }}

</div>

@endsection
