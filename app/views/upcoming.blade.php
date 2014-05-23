@layout('template')


@section('content')

<div class='container'>

	<div class='jumbotron'>
		<h1>Upcoming Features</h1>
		<p class='lead'>You wouldn't believe how many ideas we are currently developing...</p>
	</div>

	<div class='row'>

		<div class='span4'>
			<div class="thumbnail">
				<div class="caption">
					<h3>Hex Territories</h3>
					<p>A hex overlay that shows you exactly what the boundaries are for each territory. This is extremely important and is one of the first things we are going to add.</p>
				</div>
			</div>
		</div>

		<div class='span4'>
			<div class="thumbnail">
				<div class="caption">
					<h3>Tons of Icons</h3>
					<p>We are adding icons for Facilities, Outposts, Warp Gates, Control Points, Equipment Terminals, Teleporters, Spawn Control Units and everything else you can think of!</p>
				</div>
			</div>
		</div>

		<div class='span4'>
			<div class="thumbnail">
				<div class="caption">
					<h3>Resources and Benefits</h3>
					<p>You will be able to see exactly what resources and benefits your empire gains by controlling a territory or facility.</p>
				</div>
			</div>
		</div>

	</div>

	<hr>

	<div class='row'>

		<div class='span4'>
			<div class="thumbnail">
				<div class="caption">
					<h3>Grid System</h3>
					<p>A 16x16 grid overlay that matches exactly what you see in-game... Not much to say here really :-)</p>
				</div>
			</div>
		</div>

		<div class='span4'>
			<div class="thumbnail">
				<div class="caption">
					<h3>Live Map Drawing</h3>
					<p>Need to relay to another squad where the enemy is? Draw out your battle plans and intel right on the map and share them live with your buddies.</p>
				</div>
			</div>
		</div>

		<div class='span4'>
			<div class="thumbnail">
				<div class="caption">
					<h3>PS2 Data API Integration</h3>
					<p>View LIVE maps for your server right here on the website. See who controls each territory. See where the hotspots are. Is the PlanetSide 2 Data API going to allow us to do this? We don't know but we are crossing our fingers!</p>
				</div>
			</div>
		</div>

	</div>

	<div class='jumbotron'>
		<p class='lead'>and much, much more...</p>
	</div>

	@include('social')

</div>

@endsection
