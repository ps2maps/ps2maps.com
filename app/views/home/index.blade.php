@extends('templates/default')

@section('content')

<div class='container'>

	<div class='jumbotron'>
		<img src='/img/logo.png' alt="PlanetSide 2 Maps" class='img-responsive'/>
		<p class='lead'>Welcome to the definitive resource for continent maps of Amerish, Esamir and Indar.</p>
	</div>

	<div class='row'>
		<div class='col-sm-6'>
			<p><i class='icon-hand-up'></i> Go ahead... Pick a Server and Continent...</p>
		</div>
		<div class='col-sm-6'>
			<div class='pull-right'>
				@include('social')
			</div>
		</div>
	</div>

	<div class='row'>
		<div class='col-sm-12'>
			<ul class="nav nav-tabs">
				@for( $c=0; $c<count($servers); $c++ )

					<li @if ( $c==0 ) class='active' @endif>
						<a href="#{{ $servers[$c]->slug }}" data-toggle="tab">{{ $servers[$c]->name }}</a>
					</li>

				@endfor
			</ul>
		</div>
	</div>

	<div class="row tab-content">

		@for( $c=0; $c<count($servers); $c++ )

		<div class="tab-pane fade in @if ( $c==0 ) active @endif" id="{{ $servers[$c]->slug }}">
			<div class='col-xs-12 col-ms-4 col-sm-4'>
				<div class='caption'>
					<a href='{{ URL::to($servers[$c]->slug.'/amerish') }}'>
						<h3 style='text-align: center'>{{ $servers[$c]->name }} - Amerish</h3>
					</a>
				</div>
				<a href='{{ URL::to($servers[$c]->slug.'/amerish') }}'>
					<img src='{{ URL::to('/img/amerish.jpg') }}' onmouseover="this.src='{{ URL::to('/img/amerish-hover.jpg') }}'" onmouseout="this.src='{{ URL::to('/img/amerish.jpg') }}'"class='img-rounded img-responsive'/>
				</a>
			</div>
			<div class='col-xs-12 col-ms-4 col-sm-4'>
				<div class='caption'>
					<a href='{{ URL::to($servers[$c]->slug.'/esamir') }}'>
						<h3 style='text-align: center'>{{ $servers[$c]->name }} - Esamir</h3>
					</a>
				</div>
				<a href='{{ URL::to($servers[$c]->slug.'/esamir') }}'>
					<img src='{{ URL::to('/img/esamir.jpg') }}' onmouseover="this.src='{{ URL::to('/img/esamir-hover.jpg') }}'" onmouseout="this.src='{{ URL::to('/img/esamir.jpg') }}'"class='img-rounded img-responsive'/>
				</a>
			</div>
			<div class='col-xs-12 col-ms-4 col-sm-4'>
				<div class='caption'>
					<a href='{{ URL::to($servers[$c]->slug.'/indar') }}'>
						<h3 style='text-align: center'>{{ $servers[$c]->name }} - Indar</h3>
					</a>
				</div>
				<a href='{{ URL::to($servers[$c]->slug.'/indar') }}'>
					<img src='{{ URL::to('/img/indar.jpg') }}' onmouseover="this.src='{{ URL::to('/img/indar-hover.jpg') }}'" onmouseout="this.src='{{ URL::to('/img/indar.jpg') }}'"class='img-rounded img-responsive'/>
				</a>
			</div>
		</div>

		@endfor

	</div>

	<hr>

	<div class='row'>
		<div class='col-sm-4'>
			<h3>Blog</h3>
			<p>PlanetSide 2 Maps is in constant development. Our blog is where you are going to hear about all the latest features added to the site as well as what's currently on deck.</p>
			<p><a class='btn btn-primary' href='/blog'>Read More &raquo;</a></p>
		</div>
		<div class='col-sm-4'>
			<h3>Upcoming Features</h3>
			<p>PlanetSide 2 Maps is starting out small and simple... but there are a LOT of features we are developing at this very moment. Hex Territories. Facility and Outpost Icons. Resource Icons. Control Point Locations. And that doesn't even scratch the surface...</p>
			<p><a class='btn btn-primary' href='/upcoming/'>Check it out &raquo;</a></p>
		</div>
		<div class='col-sm-4'>
			<h3>Feedback and Bugs</h3>
			<p>Find a spelling error? Is an outpost mislabeled? Did an image of Sean Connery appear instead of Camp Connery? Tell us all about it! We need your help in reporting any errors or problems.</p>
			<p><a class='btn btn-primary' href='http://ps2maps.userecho.com' target='ps2maps.userecho.com'>Tell Us &raquo;</a></p>
		</div>
	</div>

</div>
@stop

@section('javascript')
(function() {
	var images = [
		'/img/amerish-hover.jpg',
		'/img/esamir-hover.jpg',
		'/img/indar-hover.jpg'
	];
	for (var c=0, len = images.length; c < len; c++)
	{
		var image = new Image();
		image.src = images[c]
	}
})()
@stop
