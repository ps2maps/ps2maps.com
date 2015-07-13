<?php
	// Faction Colors
	$nsDefault = Session::get('faction-colors.ns.default', Config::get('ps2maps.faction-colors.ns.default'));
	$nsDark = Session::get('faction-colors.ns.dark', Config::get('ps2maps.faction-colors.ns.dark'));
	$nsOutline = Session::get('faction-colors.ns.outline', Config::get('ps2maps.faction-colors.ns.outline'));
	$ncDefault = Session::get('faction-colors.nc.default', Config::get('ps2maps.faction-colors.nc.default'));
	$ncDark = Session::get('faction-colors.nc.dark', Config::get('ps2maps.faction-colors.nc.dark'));
	$ncOutline = Session::get('faction-colors.nc.outline', Config::get('ps2maps.faction-colors.nc.outline'));
	$trDefault = Session::get('faction-colors.tr.default', Config::get('ps2maps.faction-colors.tr.default'));
	$trDark = Session::get('faction-colors.tr.dark', Config::get('ps2maps.faction-colors.tr.dark'));
	$trOutline = Session::get('faction-colors.tr.outline', Config::get('ps2maps.faction-colors.tr.outline'));
	$vsDefault = Session::get('faction-colors.vs.default', Config::get('ps2maps.faction-colors.vs.default'));
	$vsDark = Session::get('faction-colors.vs.dark', Config::get('ps2maps.faction-colors.vs.dark'));
	$vsOutline = Session::get('faction-colors.vs.outline', Config::get('ps2maps.faction-colors.vs.outline'));
?>
<style id='faction-colors-id' class='faction-colors-class'>
	{{-- Marker Icons --}}
	.svg-icon svg.ns { fill: {{ $nsDefault }}; }
	.svg-icon svg.ns circle { stroke: {{ $nsOutline }}; }
	.svg-icon svg.ns path, svg.marker-icon.ns polygon { fill: {{ $nsOutline }}; }
	.svg-icon svg.nc { fill: {{ $ncDefault }}; }
	.svg-icon svg.nc circle { stroke: {{ $ncOutline }}; }
	.svg-icon svg.nc path, svg.marker-icon.nc polygon { fill: {{ $ncOutline }}; }
	.svg-icon svg.tr { fill: {{ $trDefault }}; }
	.svg-icon svg.tr circle { stroke: {{ $trOutline }}; }
	.svg-icon svg.tr path, svg.marker-icon.tr polygon { fill: {{ $trOutline }}; }
	.svg-icon svg.vs { fill: {{ $vsDefault }}; }
	.svg-icon svg.vs circle { stroke: {{ $vsOutline }}; }
	.svg-icon svg.vs path, svg.marker-icon.vs polygon { fill: {{ $vsOutline }}; }

	{{-- Log Window --}}
	.log-window .nc { color: {{ $ncDefault }}; }
	.log-window .tr { color: {{ $trDefault }}; }
	.log-window .vs { color: {{ $vsDefault }}; }
</style>

<script>
var colors = {
	ns: {
		'default': "{{ $nsDefault }}",
		'dark': "{{ $nsDark }}"
	},
	nc: {
		'default': "{{ $ncDefault }}",
		'dark': "{{ $ncDark }}"
	},
	tr: {
		'default': "{{ $trDefault }}",
		'dark': "{{ $trDark }}"
	},
	vs: {
		'default': "{{ $vsDefault }}",
		'dark': "{{ $vsDark }}"
	}
};

var continents = {
	@foreach( $continents as $continent )
	{{ $continent->id }}: { name: "{{ $continent->name }}", slug: "{{ $continent->slug }}" },
	@endforeach
};
</script>
