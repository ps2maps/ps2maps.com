{{-- Faction Colors --}}
<style>
	svg.marker-icon.nc { fill: {{ $factionColors['nc']['default'] }}; }
	svg.marker-icon.tr { fill: {{ $factionColors['tr']['default'] }}; }
	svg.marker-icon.vs { fill: {{ $factionColors['vs']['default'] }}; }
	.log-window .nc,
	.nav .continent.nc a { color: {{ $factionColors['nc']['default'] }}; }
	.nav .continent.nc a:hover,
	.nav .continent.nc a:focus {
		color: {{ $factionColors['nc']['default'] }};
		text-shadow: 0 0 10px {{ $factionColors['nc']['default'] }};
	}
	.log-window .tr,
	.nav .continent.tr a { color: {{ $factionColors['tr']['default'] }}; }
	.nav .continent.tr a:hover,
	.nav .continent.tr a:focus {
		color: {{ $factionColors['tr']['default'] }};
		text-shadow: 0 0 10px {{ $factionColors['tr']['default'] }};
	}
	.log-window .vs,
	.nav .continent.vs a { color: {{ $factionColors['vs']['default'] }}; }
	.nav .continent.vs a:hover,
	.nav .continent.vs a:focus {
		color: {{ $factionColors['vs']['default'] }};
		text-shadow: 0 0 10px {{ $factionColors['vs']['default'] }};
	}
</style>

<script>
var factionColors = {
	nc: {
		'default': "{{ $factionColors['nc']['default'] }}",
		'dark': "{{ $factionColors['nc']['dark'] }}",
	},
	tr: {
		'default': "{{ $factionColors['tr']['default'] }}",
		'dark': "{{ $factionColors['tr']['dark'] }}",
	},
	vs: {
		'default': "{{ $factionColors['vs']['default'] }}",
		'dark': "{{ $factionColors['vs']['dark'] }}"
	}
};

var continents = {
	@foreach( $continents as $continent )
	{{ $continent->id }}: { name: "{{ $continent->name }}", slug: "{{ $continent->slug }}" },
	@endforeach
};
var continentIds = "{{ implode(',',array_keys($continents)) }}";
</script>
