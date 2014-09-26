<header class="navbar navbar-default">
	<div class="container-fluid">

		<div class="navbar-header">
			<button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>

			<ul class='nav'>
				<li>
					<a href="/" class='navbar-brand'>
						<div class='logo'>
							<div class='text'>ps2maps.com</div>
						</div>
					</a>
				</li>
			</ul>
		</div>

		<nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
			<ul class="nav navbar-nav">
				<li class='dropdown solo-dropdown hidden-xs hidden-ms'>
					<a class='dropdown-toggle' data-toggle='dropdown' href="javascript:;"><i class="fa fa-caret-down"></i></a>
					<ul class="dropdown-menu">
						<li><a href="/blog"><i class='fa fa-book'></i> Read the Blog</a></li>
						<li><a href="/upcoming"><i class="fa fa-asterisk"></i> Upcoming Features</a></li>
						<li><a href="http://ps2maps.userecho.com" target="ps2maps.userecho.com"><i class='fa fa-comment'></i> Give us Feedback!</a></li>
						<li class='divider'></li>
						<li class="dropdown-header">Servers</li>
						@foreach( $servers as $server )
						<li><a href='/{{ $server->slug }}'>{{ $server->name }}</a></li>
						@endforeach
						<li class='divider'></li>
						<li><a href='/vr'>VR Training</a></li>

					</ul>
				</li>
				<li class='server'>
					<a href="/{{ $sessionServer->slug }}">{{ $sessionServer->name }}</a>
				</li>
				@foreach( $continents as $continent )
				<li class='continent' data-id='{{ $continent->id }}' data-slug='{{ $continent->slug }}'>
					<a href="/{{ $sessionServer->slug }}/{{ $continent->slug }}">{{ $continent->name }} <i class='fa fa-lock lock'></i></a>
				</li>
				@endforeach
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li>
					<a href="javascript:;">Search <i class="fa fa-search"></i></a>
				</li>
				<li>
					<a href="/settings">Settings <i class="fa fa-cog"></i></a>
				</li>
				<li>
					<a href="javascript:;">Sidebar <i class="fa fa-bar-chart"></i></a>
				</li>
			</ul>
		</nav>
	</div>
</header>



@section('jquery')

@append
