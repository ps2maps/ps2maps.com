<header class="navbar">
	<div class="container-fluid">

		<ul class='nav'>

			<li class="nav-sidebar-open visible-xs-inline-block">
				<i class="fa fa-bars"></i>
				<i class="fa fa-close"></i>
			</li>

			<li class='ps2maps-logo'>
				<a href="/">
					<span>
						<svg>
							<use xlink:href="/img/sprites.svg#ps2maps"></use>
						</svg>
					</span>
					<span class='hidden-xs hidden-sm'>PlanetSide 2 Maps</span>
					<span class='visible-xs-inline-block visible-sm-inline-block'>ps2maps.com</span>
				</a>
			</li>

			<li class='dropdown solo-dropdown hidden-xs'>
				<a class='dropdown-toggle' data-toggle='dropdown' href="javascript:;"><i class="fa fa-caret-down"></i></a>
				<ul class="dropdown-menu">
					<li>
						<a href="http://blog.ps2maps.com" target="_blank">
							<i class='fa fa-newspaper-o'></i> Read the Blog
						</a>
					</li>
					<li>
						<a href="/embeddable?server={{ $sessionServer['slug'] }}">
							<i class='fa fa-file'></i> Embeddable Maps
						</a>
					</li>
					<li>
						<a href="/donate"><i class="fa fa-usd"></i> Donate to ps2maps.com</a>
					</li>
					<li>
						<a href="http://ps2maps.userecho.com" target="ps2maps.userecho.com">
							<i class='fa fa-comment'></i> Give us Feedback!
						</a>
					</li>
					<li class='divider'></li>
					<li class="dropdown-header">Servers</li>
					@foreach( $servers as $server )
					<li class="server {{ $server['slug'] }}">
						<a href="/{{ $server['slug'] }}">{{ $server['name'] }}
							<svg class="{{ $server['platform'] }}">
								<use xlink:href="/img/sprites.svg#{{ $server['platform'] }}"/>
							</svg>
						</a>
					</li>
					@endforeach

				</ul>
			</li>

			<li class='server hidden-xs'><a href="/{{ $sessionServer['slug'] }}">{{ $sessionServer['name'] }}</a></li>

			@foreach( $continents as $continent )
			<li class='continent hidden-xs' data-id='{{ $continent->id }}' data-slug='{{ $continent->slug }}'>
				<a href="/{{ $sessionServer['slug'] }}/{{ $continent->slug }}">{{ $continent->name }}</a>
				<div class='faction-logo nc'>
					<div class="logo-inner">
						<svg>
							<use xlink:href="/img/sprites.svg#nc"></use>
						</svg>
					</div>
				</div>
				<div class='faction-logo tr'>
					<div class="logo-inner">
						<svg>
							<use xlink:href="/img/sprites.svg#tr"></use>
						</svg>
					</div>
				</div>
				<div class='faction-logo vs'>
					<div class="logo-inner">
						<svg>
							<use xlink:href="/img/sprites.svg#vs"></use>
						</svg>
					</div>
				</div>
			</li>
			@endforeach

			<li class="pull-right search-form">
				<input type="text" class="form-control search-input" placeholder="Search..."/>
				<i class='fa fa-close close-search'></i>
			</li>

			<li class='pull-right icon sidebar hidden-xs'>
				<a href="javascript:;" class='sidebar-toggle'><i class="fa fa-bar-chart"></i></a>
			</li>

			<li class='pull-right icon settings hidden-xs'>
				<a href="/settings"><i class="fa fa-cog"></i></a>
			</li>

			<li class='pull-right icon search hidden-xs'>
				<a href="javascript:;" class='search'><i class="fa fa-search"></i></a>
			</li>

		</ul>

	</div>
</header>
