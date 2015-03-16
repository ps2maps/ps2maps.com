# Canvas Tiles (for debugging)
coordinateTiles = L.gridLayer()
coordinateTiles.createTile = (coords) ->
	tile = document.createElement 'canvas'
	tile.width = tile.height = 256

	context = tile.getContext '2d'

	context.beginPath();
	context.rect 0, 0, 256, 256
	context.lineWidth = 2
	context.strokeStyle = 'white'
	context.closePath()
	context.stroke()

	context.font = "12px Arial"
	context.fillStyle = 'white'
	context.fillText "x,y " + coords.x + "," + coords.y, 20, 20
	context.fillText "z " + coords.z, 20, 40

	return tile
coordinateTiles.addTo(ps2maps.map)

ps2maps.map.on 'mouseup', (e)->
	console.log(e.latlng)
