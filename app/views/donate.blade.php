@extends('templates/default')

<?php $bodyClass = "donate"; ?>

@section('content')

<div class='container'>
	<div class='row'>
		<div class="col-sm-12">

			<h1 class="text-center">Donate to PlanetSide 2 Maps</h1>
		</div>

		<div class="col-sm-8 col-sm-offset-2">
			<p>
				Thank you for taking the time to support PlanetSide 2 Maps. Even the smallest donation helps go toward development time and server resources for the site. There are multiple donation options available to pick from. All are safe, reputable and widely-used payment methods. Thanks!<br><br>Sincerely, Jake
			</p>

		</div>
	</div>

	<div class="row">

		<div class="col-sm-6 col-md-3">
			<a href='#'>
				<div class="well">
					<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
					<input type="hidden" name="cmd" value="_s-xclick">
					<input type="hidden" name="hosted_button_id" value="J3W88RPX4WP6E">
					<input type="image" class='img-responsive center-block' src="/img/donate/paypal.png" border="0" name="submit" alt="Donate to PlanetSide 2 Maps via PayPal">
					</form>
				</div>
			</a>
		</div>
		<div class="col-sm-6 col-md-3">
			<a href='https://cash.me/$jakobud' target="_blank">
				<div class="well">
					<img class='img-responsive center-block' src="/img/donate/squarecash.png" alt="Donate to PlanetSide 2 Maps via Square Cash.me"/>
				</div>
			</a>
		</div>
		<div class="col-sm-6 col-md-3">
			<a href="https://flattr.com/submit/auto?user_id=Jakobud&url=http%3A%2F%2Fps2maps.com" target="_blank">
				<div class="well">
					<img class='img-responsive center-block' src="/img/donate/flattr.png" alt="Donate to PlanetSide 2 Maps via Flattr"/>
				</div>
			</a>
		</div>
		<div class="col-sm-6 col-md-3">
			<a href='https://gratipay.com/jakobud/' target="_blank">
				<div class="well">
					<img class='img-responsive center-block' src="/img/donate/gratipay.png" alt="Donate to PlanetSide 2 Maps via Gratipay"/>
				</div>
			</a>
		</div>

	</div>

</div>

@stop
