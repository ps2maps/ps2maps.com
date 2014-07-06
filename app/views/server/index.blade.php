@extends('templates/default')

@section('content')

<div class='container-fluid'>
	<div id='continents' class='row'>

		@foreach( $continents as $continent )
		<div class='continent {{ $continent->slug }} col-sm-12 col-lg-4'>

			<div class='row'>

				<div class='col-sm-6 col-ms-6 col-lg-12'>
					<h2>{{ $continent->name }}</h2>
					<div id='{{ $continent->slug }}-map' class='map'></div>
				</div>

				<div class='col-sm-6 col-ms-6 col-lg-12'>
					<div class='territory'>
						<table class='territory-control-bar'>
							<tr>
								<td data-value='20' style='width: 20%'>
									<div class='nc'>20%</div>
								</td>
								<td data-value='15' style='width: 15%'>
									<div class='tr'>15%</div>
								</td>
								<td data-value='65' style='width: 65%'>
									<div class='vs'>65%</div>
								</td>
							</tr>
						</table>
					</div>
					<table class='table table-bordered table-condensed'>
						<tr>
							<td class='name'>Amp Stations</td>
							<td>
								<span class='icon amp-station nc'></span>
								<span class='icon amp-station nc'></span>
								<span class='icon amp-station tr'></span>
								<span class='icon amp-station tr'></span>
								<span class='icon amp-station tr'></span>
								<span class='icon amp-station vs'></span>
							</td>
						</tr>
						<tr>
							<td class='name'>Bio Labs</td>
							<td>
								<span class='icon bio-lab nc'></span>
								<span class='icon bio-lab tr'></span>
								<span class='icon bio-lab tr'></span>
								<span class='icon bio-lab vs'></span>
							</td>
						</tr>
						<tr>
							<td class='name'>Tech Plans</td>
							<td>
								<span class='icon tech-plant nc'></span>
								<span class='icon tech-plant tr'></span>
								<span class='icon tech-plant tr'></span>
								<span class='icon tech-plant tr'></span>
								<span class='icon tech-plant vs'></span>
							</td>
						</tr>
					</table>
				</div>

			</div>
			<hr class='hidden-lg'>
		</div>
		@endforeach

	</div>
</div>
@stop

@section('scripts')

<script>
	var continents = [];
	@foreach( $continents as $continent )
	continents.push("{{ $continent->slug }}");
	@endforeach
</script>

<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.8/d3.js"></script>
@foreach( $continents as $continent )
	<script src="/js/{{ $continent->slug }}.js"></script>
@endforeach
<script src="/js/server.js"></script>

@append

@section('javascript')

@append

@section('jquery')



@append
