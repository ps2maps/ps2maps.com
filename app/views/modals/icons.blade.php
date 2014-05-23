<div class="modal hide fade" id='icons-modal'>
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h3>Map Icons</h3>
		<p>
			Check on/off the various icons in order to show or hide them on the map.
			<i class='icon-info-sign' data-toggle='tooltip' data-placement='bottom' title="PROTIP: Fewer enabled icons will result in better map performance!"></i>
		</p>

	</div>
	<div class="modal-body">

		<div class='row-fluid'>

			<div class='span5 offset1'>

				<label class="checkbox">
					<input type="checkbox" data-default='true' data-layer='warpgate' id='checkbox-warpgate' >
					<i class='icon warpgate'></i> Warpgates
				</label>

				<hr>

				<label class="checkbox">
					<input type="checkbox" data-default='true' data-layer='ampStation' id='checkbox-ampStation' >
					<i class='icon amp-station'></i> Amp Stations
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='true' data-layer='bioLab' id='checkbox-bioLab' >
					<i class='icon bio-lab'></i> Bio Labs
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='true' data-layer='techPlant' id='checkbox-techPlant' >
					<i class='icon tech-plant'></i> Tech Plants
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='true' data-layer='largeOutpost' id='checkbox-largeOutpost' >
					<i class='icon large-outpost'></i> Large Outposts
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='true' data-layer='smallOutpost' id='checkbox-smallOutpost' >
					<i class='icon small-outpost'></i> Small Outposts
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='true' data-layer='capturePoint|forwardSpawn' id='checkbox-capturePoint'  >
					<i class='icon capture-point'></i> Capture Points
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='true' data-layer='forwardSpawnLabeled' id='checkbox-forwardSpawnLabeled' >
					<i class='icon forward-spawn'></i> Forward Spawns
				</label>

				<hr>

				<label class="checkbox">
					<input type="checkbox" data-default='false' data-layer='spawnTube' id='checkbox-spawnTube'>
					<i class='icon spawn-tube'></i> Spawn Tubes
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='false' data-layer='spawnControlUnit' id='checkbox-spawnControlUnit'>
					<i class='icon spawn-control-unit'></i> Spawn Control Unit
				</label>

				<hr>

				<label class="checkbox">
					<input type="checkbox" data-default='false' data-layer='ammoTower' id='checkbox-ammoTower'>
					<i class='icon ammo-tower'></i> Ammo Towers
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='false' data-layer='landingPad' id='checkbox-landingPad'>
					<i class='icon landing-pad'></i> Landing Pads
				</label>


			</div>
			<div class='span5'>

				<label class="checkbox">
					<input type="checkbox" data-default='true' data-layer='equipmentTerminal' id='checkbox-equipmentTerminal'>
					<i class='icon equipment-terminal'></i> Equipment
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='true' data-layer='groundVehicleTerminal' id='checkbox-groundVehicleTerminal'>
					<i class='icon ground-vehicle-terminal'></i> Ground Vehicle
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='true' data-layer='groundTransportTerminal' id='checkbox-groundTransportTerminal'>
					<i class='icon ground-transport-terminal'></i> Ground Transport
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='true' data-layer='aircraftTerminal' id='checkbox-aircraftTerminal'>
					<i class='icon aircraft-terminal'></i> Aircraft
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='true' data-layer='galaxyTerminal' id='checkbox-galaxyTerminal'>
					<i class='icon galaxy-terminal'></i> Galaxy
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='false' data-layer='warpgateTerminal' id='checkbox-warpgateTerminal'>
					<i class='icon warpgate-terminal'></i> Warpgate
				</label>

				<hr>

				<label class="checkbox">
					<input type="checkbox" data-default='false' data-layer='spawnControlUnitShieldGenerator' id='checkbox-spawnControlUnitShieldGenerator'>
					<i class='icon scu-shield-generator'></i> SCU Shield
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='false' data-layer='horizontalShieldGenerator' id='checkbox-horizontalShieldGenerator'>
					<i class='icon horizontal-shield-generator'></i> Horizontal Shield
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='false' data-layer='verticalShieldGenerator' id='checkbox-verticalShieldGenerator'>
					<i class='icon vertical-shield-generator'></i> Vertical Shield
				</label>
				<label class="checkbox">
					<input type="checkbox" data-default='false' data-layer='gateShieldGenerator' id='checkbox-gateShieldGenerator'>
					<i class='icon gate-shield-generator'></i> Gate Shield
				</label>

			</div>

		</div>

		<div class='center'>
			<hr>
				<button id='check-all' class='btn btn-success'>Check All</button>
				<button id='check-none' class='btn btn-danger'>Check None</button>
				<button id='check-default' class='btn btn-info'>Default</button>
		</div>

	</div>
</div>
