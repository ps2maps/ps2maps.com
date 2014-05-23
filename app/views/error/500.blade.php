@layout('template')

@section('content')

<?php

	$messages = array(
		'I think there is something wrong...',
		'You broke something in the codez',
		"We'll be RIGHT back. Promise.",
	);

?>

<div class='container'>

	<div class='hero-unit'>

		<h1>505</h1>
		<p>{{ $messages[array_rand($messages)] }}</p>

	</div>

</div>

@endsection
