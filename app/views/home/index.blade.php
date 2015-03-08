@extends('templates/default')

<?php $bodyClass = "home"; ?>

@section('content')

<div class="intro">
	<div class="headlines">
		<h1>PlanetSide 2 Maps</h1>
		<h2>The definitive source for maps of Amerish, Esamir, Hossin and Indar</h2>
		<svg viewBox="0 0 256 256" class="">
			<filter id="dropshadow" height="130%">
			  <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
			  <feOffset dx="1" dy="4" result="offsetblur"/>
			  <feMerge>
			    <feMergeNode/>
			    <feMergeNode in="SourceGraphic"/>
			  </feMerge>
			</filter>
			<use xlink:href="#ps2maps_logo" style="filter:url(#dropshadow)"></use>
		</svg>
	</div>
</div>

<div class='container-fluid'>

	<div class="row">
		<div class="col-sm-12">

			<select class="servers">
				@foreach( $servers as $server )
				<option value="{{ $server->slug }}" <?php if ( $server->id == $sessionServer->id ) echo 'selected'; ?>>{{ $server->name }}</option>
				@endforeach
			</select>

			<div class='tabpanel'>

			  <ul class="nav nav-tabs">
			  	<li class='caption hidden-xs'>First, pick a server...</li>
			  	@foreach( $servers as $server )
			    <li class="<?php if ( $server->id == $sessionServer->id ) echo 'active'; ?>" data-target="{{ $server->slug }}">
			    	<a href="#{{ $server->slug }}" data-toggle="tab">{{ $server->name }}</a>
			    </li>
			    @endforeach
			  </ul>

			  <div class="tab-content">

			  	@foreach( $servers as $server )
			    <div class="tab-pane <?php if ( $server->id == $sessionServer->id ) echo 'active'; ?>" id="{{ $server->slug }}">

			    	<div class='caption'>
			    		<span class='hidden-xs'>Next, visit the </span>
			    		<a class='btn btn-primary' href="/{{ $server->slug }}">{{ $server->name }} Global Operations page</a>
			    		<span class="hidden-xs"> or pick a continent <i class="fa fa-level-down"></i></span>
			    	</div>

			    	<ul class="continents">
			    		@foreach( $continents as $continent )<li>
			    			<a href='/{{ $server->slug }}/{{ $continent->slug }}'>
			    				<h2>{{ $continent->name }} on <br class='visible-xs'> {{ $server->name }}</h2>
			    				<img src='{{ URL::to('/img/'.$continent->slug.'.jpg') }}' onmouseover="this.src='{{ URL::to('/img/'.$continent->slug.'-hover.jpg') }}'" onmouseout="this.src='{{ URL::to('/img/'.$continent->slug.'.jpg') }}'"class='img-rounded img-responsive'/>
			    			</a>
			    		</li>@endforeach
			    	</ul>

			    </div>
			    @endforeach
			  </div>

			</div>

		</div>
	</div>

</div>

@stop

@section('javascript')
(function() {
	var images = [];
	@foreach( $continents as $continent )
	images.push('/img/{{ $continent->slug }}-hover.jpg');
	@endforeach
	for (var c=0, len = images.length; c < len; c++) {
		var image = new Image();
		image.src = images[c]
	}
})()
@append

@section('jquery')

// Keep the select and tabs in sync
$$('ul.nav-tabs li').on('shown.bs.tab', function(e) {
	$$('select.servers').val(e.target.hash.replace('#',''));
});
$$('select.servers').on('change', function(e){
	var server = $(this).find(':selected').val();
	$$('ul.nav-tabs li[data-target="' + server + '"] a').tab('show');
});


@append


<?php

	$images = [
		"672.jpg",
		"945.jpg",
		"20121004_506e4bed29415.jpg",
		"PS2_Screen_VSgetlightassaulted.jpg",
		"ps2gameplayscreenshot11.jpg",
		"screenshot_20130731-16-18-44.jpg",
	];

?>

@section('styles')
<style>
div.intro {
	background-image: url(/img/home/{{ $images[array_rand($images)] }});
}
</style>
@append
