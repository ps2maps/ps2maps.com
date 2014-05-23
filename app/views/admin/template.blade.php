<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>PlanetSide 2 Maps - The definitive resource for continent maps of Amerish, Esamir and Indar</title>
	<meta name="description" content="PlanetSide 2 Maps - The definitive resource for continent maps of Amerish, Esamir and Indar">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
	<link rel="canonical" href="{{ URL::current() }}" />
	<link href="/bootstrap/css/bootstrap.css" rel="stylesheet" media="screen"/>
	<link href="/bootstrap/css/bootstrap-responsive.css" rel="stylesheet"/>
	<link href="/css/main.css" rel="stylesheet" type="text/css" charset="utf-8"/>
	<link href='http://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet' type='text/css'>
	{{ Asset::styles() }}
	<style>
		.icon { pointer-events: auto;}
	</style>

	{{ HTML::script('/js/modernizr.custom.14551.js') }}

	<script>
	@yield('javascript-head');
	</script>
</head>
<body>

	@include('menu.menu')

	@yield('content')

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/jquery-1.8.2.min.js"><\/script>')</script>
	{{ HTML::script('/bootstrap/js/bootstrap.min.js') }}
	{{ HTML::script('/js/script.js') }}
	{{ Asset::scripts() }}

	<script>
		@yield('admin-scripts')
	</script>

	<script>
		@yield('javascript')

		$('document').ready(function()
		{
			@yield('jquery')
		});

	</script>

</body>
</html>
