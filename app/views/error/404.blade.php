@layout('template')

<?php $title = '404 Error Page Not Found - PlanetSide 2 Maps'; ?>
<?php $error404 = true; ?>

@section('content')

<?php

	$messages = array(
		'Do you need a map?',
		'I think you are lost...',
		"404'd!",
		'Houston, we have a problem.',
		'I AM ERROR.',
		'I told you to stop and ask for directions...',
		'You broke the internet :-(',
		"That page doesn't exist!",
	);

?>

<div class='container'>

	<div class='hero-unit'>

		<h1>404</h1>
		<p>{{ $messages[array_rand($messages)] }}</p>

	</div>

</div>


@endsection

