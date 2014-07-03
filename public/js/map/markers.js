// Marker Icons
var icons = {
	ampStation: {
		ns: L.divIcon({
			className: 'icon amp-station',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		nc: L.divIcon({
			className: 'icon amp-station nc',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		tr: L.divIcon({
			className: 'icon amp-station tr',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		vs: L.divIcon({
			className: 'icon amp-station vs',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	bioLab: {
		ns: L.divIcon({
			className: 'icon bio-lab',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		nc: L.divIcon({
			className: 'icon bio-lab nc',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		tr: L.divIcon({
			className: 'icon bio-lab tr',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		vs: L.divIcon({
			className: 'icon bio-lab vs',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	techPlant: {
		ns: L.divIcon({
			className: 'icon tech-plant',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		nc: L.divIcon({
			className: 'icon tech-plant nc',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		tr: L.divIcon({
			className: 'icon tech-plant tr',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		vs: L.divIcon({
			className: 'icon tech-plant vs',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	largeOutpost: {
		ns: L.divIcon({
			className: 'icon large-outpost',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		nc: L.divIcon({
			className: 'icon large-outpost nc',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		tr: L.divIcon({
			className: 'icon large-outpost tr',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		vs: L.divIcon({
			className: 'icon large-outpost vs',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	smallOutpost: {
		ns: L.divIcon({
			className: 'icon small-outpost',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		nc: L.divIcon({
			className: 'icon small-outpost nc',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		tr: L.divIcon({
			className: 'icon small-outpost tr',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		vs: L.divIcon({
			className: 'icon small-outpost vs',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	warpgate: {
		ns: L.divIcon({
			className: 'icon warpgate',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		nc: L.divIcon({
			className: 'icon warpgate nc',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		tr: L.divIcon({
			className: 'icon warpgate tr',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
		vs: L.divIcon({
			className: 'icon warpgate vs',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	forwardSpawnLabeled: {
		ns: L.divIcon({
			className: 'icon forward-spawn',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
	},
	forwardSpawn: {
		ns: L.divIcon({
			className: 'icon forward-spawn',
			iconSize: [32,32],
			iconAnchor: [16,16]
		}),
	},
	aircraftTerminal: {
		ns: L.divIcon({
			className: 'icon aircraft-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	galaxyTerminal: {
		ns: L.divIcon({
			className: 'icon galaxy-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	groundVehicleTerminal: {
		ns: L.divIcon({
			className: 'icon ground-vehicle-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	groundTransportTerminal: {
		ns: L.divIcon({
			className: 'icon ground-transport-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	equipmentTerminal: {
		ns: L.divIcon({
			className: 'icon equipment-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	warpgateTerminal: {
		ns: L.divIcon({
			className: 'icon warpgate-terminal',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	verticalShieldGenerator: {
		ns: L.divIcon({
			className: 'icon vertical-shield-generator',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	horizontalShieldGenerator: {
		ns: L.divIcon({
			className: 'icon horizontal-shield-generator',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	gateShieldGenerator: {
		ns: L.divIcon({
			className: 'icon gate-shield-generator',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	spawnControlUnitShieldGenerator: {
		ns: L.divIcon({
			className: 'icon scu-shield-generator',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	spawnBeacon: {
		ns: L.divIcon({
			className: 'icon spawn-beacon',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	spawnControlUnit: {
		ns: L.divIcon({
			className: 'icon spawn-control-unit',
			iconSize: [64,32],
			iconAnchor: [32,16]
		}),
	},
	teleporter: {
		ns: L.divIcon({
			className: 'icon teleporter',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	spawnTube: {
		ns: L.divIcon({
			className: 'icon spawn-tube',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	ammoTower: {
		ns: L.divIcon({
			className: 'icon ammo-tower',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	landingPad: {
		ns: L.divIcon({
			className: 'icon landing-pad',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	},
	capturePoint: {
		ns: L.divIcon({
			className: 'icon capture-point',
			iconSize: [32,32],
			iconAnchor: [16,16]
		})
	}
}
