<!DOCTYPE html>
<html>
<head>
	<title></title>
	<style type="text/css">
	body {
		margin: 0;
		padding: 0;
	}
	</style>
</head>
<body>

	<div class="test">
			<iframe id='iframe' src="http://ps2maps.gunsight/connery/hossin/embed" style='border:none;overflow:hidden; min-width:100%; height: auto;'></iframe>
	</div>


<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>

<script>

	$(window).on('resize', function() {
		$('iframe').height( $('iframe').width() )
	}).trigger('resize');

	$('iframe').load(function(){
		document.getElementById('iframe').contentWindow.$('.map').on('FacilityCaptured', function(e,data){
			console.log(data);
		});
	});


</script>

</body>
</html>
