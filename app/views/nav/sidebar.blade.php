
<div id="sidebar-wrapper">
	<ul class='nav'>
		<li class="server">
			<a href="/{{ $sessionServer->slug }}">
				{{ $sessionServer->name }} Global Ops <i class="fa fa-arrow-circle-right"></i>
			</a>
		</li>

		@foreach( $continents as $c )
		<?php
			$current = isset($continent) && $continent->slug == $c->slug ? true : false;
		?>

		<li class="continent @if ($current) current @endif" data-id='{{ $c->id }}' data-slug='{{ $c->slug }}'>
			<a href="/{{ $sessionServer->slug }}/{{ $c->slug }}">{{ $c->name }}</a>
			@if ( $current )
				<div class="chart"></div>
			@endif
			<div class='faction-logo nc'>
				<svg viewBox='0 0 256 256'>
					<use xlink:href="#nc_logo"></use>
				</svg>
			</div>
			<div class='faction-logo tr'>
				<svg viewBox='0 0 256 256'>
					<use xlink:href="#tr_logo"></use>
				</svg>
			</div>
			<div class='faction-logo vs'>
				<svg viewBox='0 0 256 256'>
					<use xlink:href="#vs_logo"></use>
				</svg>
			</div>
		</li>
		@endforeach

		<li class='divider'></li>

		<li>
			<a href="http://blog.ps2maps.com" target="_blank">
				<i class='fa fa-newspaper-o'></i> Read the Blog
			</a>
		</li>

		<li>
			<a href="/embeddable?server={{ $sessionServer->slug }}">
				<i class='fa fa-file'></i> Embeddable Maps
			</a>
		</li>

		{{--<li>
			<a href="/donate"><i class="fa fa-usd"></i> Donate to ps2maps.com</a>
		</li>--}}

		<li>
			<a href="http://ps2maps.userecho.com" target="ps2maps.userecho.com">
				<i class='fa fa-comment'></i> Give us Feedback!
			</a>
		</li>

	</ul>
</div>
<div id="overlay"></div>
