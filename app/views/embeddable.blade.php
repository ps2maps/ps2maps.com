@extends('templates/default')

<?php $bodyClass = "embeddable"; ?>

@section('title')
Embeddable PlanetSide 2 Maps - ps2maps.com
@stop

@section('meta_description')
Create embeddable continent maps for Amerish, Esamir, Hossin or Indar for PlanetSide 2 Maps - ps2maps.com
@stop

@section('content')

<div class='container-fluid'>

	<div class="row">
		<div class="col-sm-12">

			<h1>Embeddable PlanetSide 2 Maps</h1>

		</div>

		<div class="col-sm-6">

			<p>
				You can embed continent maps in an &lt;iframe&gt; on your own website. The map will automatically update facility ownership from Daybreak's Census API. The map also emits DOM events that you can listen to whenever a faciity is captured. You can click on the continent name or the ps2maps.com logo on the map to be taken directly to <a href="/">ps2maps.com</a>.
			</p>

			<p>
				These embeddable maps are simplified. They include only the continent and the faction-colored territories. Facility icons and lattice links will be added in the near future. Some other possible features may include clicking on territories to see more information about them.
			</p>

			<p>
				<a href="//ps2maps.userecho.com" target="_blank">Please contact us</a> if you have any issues, feedback, bug reports, feature requests or if you just want to show us a cool website you integrated our maps into.
			</p>

			<h4>First, choose a Server and Continent:</h4>

			<form class="form-inline">

				<select class="servers form-control">
					@foreach( $servers as $server )
						@if (Input::get('server') == $server->slug )
							<option value="{{ $server->slug }}" selected>{{ $server->name }}</option>
						@else
							<option value="{{ $server->slug }}">{{ $server->name }}</option>
							@endif
					@endforeach
				</select>

				<select class="continents form-control">
					@foreach( $continents as $continent)
						@if (Input::get('continent') == $continent->slug)
							<option value="{{ $continent->slug }}" selected>{{ $continent->name }}</option>
						@else
							<option value="{{ $continent->slug }}">{{ $continent->name }}</option>
						@endif
					@endforeach
				</select>

			</form>

			<hr>

			<h4>Next, copy/paste this HTML onto your webpage:</h4>

			<p>
				<input type='text' class="form-control code" readonly='readonly'/>
			</p>

			<hr>

			<h4>If you want the &lt;iframe&gt; to be responsive...</h4>

			<p>
				Because the iframe uses dynamically-generated SVGs inside it, a little jQuery is necessary to keep the iframe responsive in a fluid container. The following jQuery will take care of this:
			</p>

<pre>
$(window).on('resize', function() {
  $('#<span class='iframe-id'></span>').height( $('#<span class='iframe-id'></span>').width() );
}).trigger('resize');
</pre>

			<p>
				If you are using a staticly sized container then the jQuery is not necessary. For your CSS needs, the embedded map is a square (the height is always the exact same as it's width).
			</p>

			<hr>

			<div class="hidden-xs">
				<img src="/img/embeddable-example.jpg" class='img-responsive center-block' alt="Example Embedded Map"/>
				<div class='text-center'>
					Example Embedded Map
				</div>
			</div>

		</div>

		<div class="col-sm-6">

			<h4>Optional: Listen for Facility Capture and Resecure Events</h4>

			<p>The &lt;iframe&gt; uses jQuery to emit DOM events every time a facility is captured or resecured. You can listen for these events on your webpage and do something cool with the data that is passed in the events. Just use the following jQuery on your webpage to setup an event listener:</p>

<pre>
$('#<span class='iframe-id'></span>').load(function(){
  document.getElementById('#<span class='iframe-id'></span>').contentWindow
    .$('.map').on('FacilityCaptured', function(event, data){

      console.log(data); // Do something fun with the data here

    });
});
</pre>

			<p>The two event names you can listen for are <code>FacilityCaptured</code> and <code>FacilityResecured</code>. The <code>data</code> variable that is passed to the DOM Event will be a JSON object similar to the following:</p>

<pre>
continent: {
  id: 4,
  name: "Hossin",
  slug: "hossin"
},
facility: {
  id: 300010,
  name: "Hurakan Secure Storage"
},
faction: {
  id: 1,
  name: "Vanu Soverignty",
  slug: "vs"
},
timestamp: 1424140683
</pre>

		<div id="disqus_thread"></div>
		<script type="text/javascript">
		    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
		    var disqus_shortname = 'ps2maps'; // required: replace example with your forum shortname
				    /* * * DON'T EDIT BELOW THIS LINE * * */
		    (function() {
		        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
		        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
		        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
		    })();
		</script>
		<noscript>
			Please enable JavaScript to view the
			<a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a>
		</noscript>
		<a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>


		</div>
	</div>

</div>

@stop

@section('jquery')

$('select').on('change', function(){
	var server = $$('select.servers').val();
	var continent = $$('select.continents').val();
	var iframeId = server + "-" + continent + "-iframe";

	var code = "<iframe id='" + iframeId + "' src='" + document.location.origin + "/" + server + "/" + continent + "/embed' style='border:none; overflow:hidden; min-width:100%; height:auto;'></iframe>";

	$$('.code').val(code);

	$$('.iframe-id').html(iframeId);

}).trigger('change');


@append
