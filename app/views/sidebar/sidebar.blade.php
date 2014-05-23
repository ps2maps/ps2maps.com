<div id='sidebar' class=''>

	<div id='sidebar_content'>

		<div class="accordion">

			@if ( isset($server) )
			@include('sidebar/server')

			@include('sidebar/territory-info')

			@include('sidebar/stats')
			@endif

			@include('sidebar/controls')

			@include('sidebar/feedback')

		</div>
	</div>

	<a href='javascript:;' id='sidebar_handle'>
		<span id='handle'></span>
	</a>

</div>
