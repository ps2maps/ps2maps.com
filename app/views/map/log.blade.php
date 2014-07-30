<div class='log-window container-fluid'>
	<div class='log-header row'>
		<div class='col-sm-6'>Facility Capture Log - {{ $server->name }} {{ $continent->name }}</div>
		<div class='col-sm-6 text-right filters'>

			<span class='nc'><input type='checkbox' class='filter-checkbox' id='filter-nc' data-filter='nc'/> <label for="filter-nc">NC</label></span>
			<span class='tr'><input type='checkbox' class='filter-checkbox' id='filter-tr' data-filter='tr'/> <label for="filter-tr">TR</label></span>
			<span class='vs'><input type='checkbox' class='filter-checkbox' id='filter-vs' data-filter='vs'/> <label for="filter-vs">VS</label></span>

			<span class='captures'><input type='checkbox' class='filter-checkbox' id='filter-captured' data-filter='captured'/> <label for="filter-captures">Captures</label></span>
			<span class='resecures'><input type='checkbox' class='filter-checkbox' id='filter-resecured' data-filter='resecured'/> <label for="filter-resecures">Resecures</label></span>
			<span class='misc'><input type='checkbox' class='filter-checkbox' id='filter-misc' data-filter='misc'/> <label for="filter-misc">Misc.</label></span>

		</div>
	</div>
	<div class='row log-body'>
		<div class='log-list'>
			<ul>
			</ul>

		</div>

	</div>

</div>
