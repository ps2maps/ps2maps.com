@layout('template')

<?php
	// GET variables (x,y,z coordinates)
	$x = Input::get('x');
	if ( !is_numeric($x) )
		$x = $continent->center_lat;

	$y = Input::get('y');
	if ( !is_numeric($y) )
		$y = $continent->center_lng;

	$z = Input::get('z');
	if ( !is_numeric($z) )
		$z = $continent->zoom_default;

	// Title
	if ( isset($server) )
	{
		$title = "PlanetSide 2 Maps > " . $server->name ." server > " . $continent->name . ' continent';
		$metaDescription = "Interactive continent map of " . $continent->name . " on the " . $server->name . " server.";
	}

?>

@section('javascript-head')

@if ( isset($server) )
var server = { id: {{$server->id}}, name: "{{$server->name}}", slug: "{{$server->slug}}" };
@else
var server = null;
@endif

var continent = { id: {{$continent->id}}, name: "{{$continent->name}}", slug: "{{$continent->slug}}", minZoom: "{{ $continent->zoom_min }}", maxZoom: "{{ $continent->zoom_max }}" };
var defaultView = {lat:{{$x}},lng:{{$y}},zoom:{{$z}}};
@endsection

@section('content')

	<div id='map'></div>

	{{-- Sidebar
	@include('sidebar/sidebar')

	{{-- Permalink Modal
	@include('modals/permalink')

	{{-- Layers Modal
	@include('modals/icons')

	{{-- UserEcho Feedback Widget
	<script type='text/javascript'>

	var _ues = {
	host:'ps2maps.userecho.com',
	forum:'18357',
	lang:'en',
	tab_corner_radius:5,
	tab_font_size:20,
	tab_image_hash:'ZmVlZGJhY2s%3D',
	tab_chat_hash:'Y2hhdA%3D%3D',
	tab_alignment:'left',
	tab_text_color:'#FFFFFF',
	tab_text_shadow_color:'#00000055',
	tab_bg_color:'#57A957',
	tab_hover_color:'#F45C5C'
	};

	(function() {
	    var _ue = document.createElement('script'); _ue.type = 'text/javascript'; _ue.async = true;
	    _ue.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.userecho.com/js/widget-1.4.gz.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(_ue, s);
	  })();

	</script>
	<a onmouseover="UE.Popin.preload();" href="#" onclick="UE.Popin.show(); return false;">feedback</a>

@endsection