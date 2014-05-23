<a href="#" class="dropdown-toggle" data-toggle="dropdown">

	{{ isset($server) ? $server->name : "Servers" }}

	<b class="caret"></b>
</a>
<ul class="dropdown-menu">
	<li>
		<a href="/vr"></i> VR Training</a>
	</li>
	<li class="divider"></li>
	<li class='nav-header'>Other Servers</li>

	@foreach( $servers as $server )

	<li class="dropdown-submenu">
		<a href="javascript:;">{{ $server->name }}</a>
		<ul class="dropdown-menu">
			<li><a href="/{{ $server->slug }}/amerish">Amerish</a></li>
			<li><a href="/{{ $server->slug }}/esamir">Esamir</a></li>
			<li><a href="/{{ $server->slug }}/indar">Indar</a></li>
		</ul>
	</li>

	@endforeach

</ul>
