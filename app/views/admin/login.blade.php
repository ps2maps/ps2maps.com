@layout('admin.template')

@section('content')

<div class='container'>

	<div class='row'>

		<div class='span4 offset4 well'>

			{{ Form::open() }}

					@if (Session::has('login_errors'))

					<div class="alert alert-error">
							<a class="close" data-dismiss="alert" href="#">x</a>Incorrect Username or Password
					</div>

					@endif

					<p>{{ Form::text('email', Input::old('email'), array('class'=>'span4', 'placeholder'=>'Email Address', 'autofocus')) }}</p>

					<p>{{ Form::password('password', array('class'=>'span4', 'placeholder'=>'Password')) }}</p>

					<p>{{ Form::submit('Login', array('class'=>'btn btn-primary')) }}</p>

			{{ Form::close() }}

		</div>

	</div>

</div>

@endsection
