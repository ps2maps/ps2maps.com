<div class='sidebar'>
	<div class="scroll-container">

		<div class='section territory-control'>
			<h2>{{ $continent->name }} Territory Control</h2>
			<div class='chart'></div>
			<div class='faction nc'>
				<svg viewBox='0 0 256 256'>
					<use xlink:href="#nc_logo"></use>
				</svg>
				<h2>New Conglomerate controlled</h2>
			</div>
			<div class='faction tr'>
				<svg viewBox='0 0 256 256'>
					<use xlink:href="#tr_logo"></use>
				</svg>
				<h2>Terran Republic controlled</h2>
			</div>
			<div class='faction vs'>
				<svg viewBox='0 0 256 256'>
					<use xlink:href="#vs_logo"></use>
				</svg>
				<h2>Vanu Soverignty controlled</h2>
			</div>
		</div>

		<div class="section facility-details">
			<h2 class='name'></h2>
			<div class='type'>
				<span class="icon"></span>
				<span class="name"></span>
			</div>
			<div class="faction"></div>
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
		</div>

		<div class="section filter-controls">
			<h2>Filters</h2>

			<label class='show' for='control-terrain'>
				 <input type="checkbox" class='control-terrain' id='control-terrain'/> Terrain
			</label>

			<label class='show' for='control-facilities'>
				 <input type="checkbox" class='control-facilities' id='control-facilities'/> Facilities
			</label>

			<label class='show' for='control-lattice'>
				 <input type="checkbox" class='control-lattice' id='control-lattice'/> Facility Connections
			</label>

			<select class='control-territories' id='control-territories'>
				<option value='color'>Show Territory Control</option>
				<option value='nocolor'>Show Territories Only</option>
				<option value='hide'>Hide Territories</option>
			</select>

			<select class='control-grid' id='control-grid'>
				<option value='grid'>Show Grid</option>
				<option value='both'>Show Grid and SubGrid</option>
				<option value='hide'>Hide Grid</option>
			</select>

		</div>

		<div class="section embed text-center">
			<i class='fa fa-chevron-left'></i>
			<a href="/embeddable?server={{ $server->slug }}&continent={{ $continent->slug }}">
				 Embed this Map
			</a>
			<i class='fa fa-chevron-right'></i>
		</div>

	</div>

</div>
