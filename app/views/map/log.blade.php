<div class='log-window container-fluid hidden-xs hidden-ms'>
	<div class='log-header row'>
		<div class='col-sm-5'>
			<span>Territory Control Log - {{ $server->name }} {{ $continent->name }}</span> <span class="badge log-count"></span>
		</div>
		<div class='col-sm-7 text-right filters hidden-xs hidden-ms'>

			<span class='nc'><input type='checkbox' class='filter-checkbox' id='filter-nc' data-filter='nc'/> <label for="filter-nc">NC</label></span>
			<span class='tr'><input type='checkbox' class='filter-checkbox' id='filter-tr' data-filter='tr'/> <label for="filter-tr">TR</label></span>
			<span class='vs'><input type='checkbox' class='filter-checkbox' id='filter-vs' data-filter='vs'/> <label for="filter-vs">VS</label></span>

			<span class='captures'><input type='checkbox' class='filter-checkbox' id='filter-captured' data-filter='captured'/> <label for="filter-captures">Captures</label></span>
			<span class='resecures'><input type='checkbox' class='filter-checkbox' id='filter-resecured' data-filter='resecured'/> <label for="filter-resecures">Resecures</label></span>
			<span class='misc'><input type='checkbox' class='filter-checkbox' id='filter-misc' data-filter='misc'/> <label for="filter-misc">Misc.</label></span>
			<button type='button' class='btn btn-xs btn-info clear-button'>Clear</button>
			<i class="fa fa-bars log-handle"></i>
		</div>
	</div>
	<div class='row log-body'>
		<div class='log-list'>
			<ul>
			</ul>
		</div>
	</div>
</div>
