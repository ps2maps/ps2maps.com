@foreach( $continents as $continent )

<li class='dropdown @if($current_continent->id == $continent->id) active @endif'>
	<a href="#" class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b></a>
	<ul class="dropdown-menu">

		@if ( $current_continent->id == $continent->id )
			<li><a href='javascript:;' onclick="map.setView([128,128], 2)">{{ $continent->name }} Continent</a></li>
		@else
			<li><a href='/{{ $server->slug }}/{{ $continent->slug }}'>{{ $continent->name }} Continent</a></li>
		@endif

		<li class="divider"></li>
		<li class='nav-header'>Warp Gates</li>

		@foreach( $continent->warpgates as $warpgate )

			@if ( $current_continent->id == $continent->id )
				<li><a href='javascript:;' onclick="map.setView([{{ $warpgate->lat }}, {{ $warpgate->lng }}],4)">{{ $warpgate->faction->name }} </a></li>
			@else
				<li><a href="/{{ $server->slug }}/{{ $continent->slug }}?x={{ $warpgate->lat }}&y={{ $warpgate->lng }}&z=4">{{ $warpgate->faction->name }}</a></li>
			@endif

		@endforeach

		<li class="divider"></li>
		<li class='nav-header'>Facilities</li>

		@foreach( $continent->facilities as $facility )
			@if ( $current_continent->id == $continent->id )
				<li><a href='javascript:;' onclick="map.setView([{{ $facility->lat }},{{ $facility->lng }}],4)">{{$facility->text}}</a></li>
			@else
				<li><a href="/{{ $server->slug }}/{{ $continent->slug }}?x={{ $facility->lat }}&y={{ $facility->lng }}&z=4">{{$facility->text}}</a></li>
			@endif
		@endforeach

	</ul>
</li>
<li class='dropdown @if($current_continent->id == $continent->id) active @endif'>
	<a href="#" class="dropdown-toggle" data-toggle="dropdown">{{ $continent->name }}</a>
</li>

@endforeach
