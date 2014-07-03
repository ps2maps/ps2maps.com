//--------------------------------------------------------------------------
// Hexagon Calculation and Creation
//--------------------------------------------------------------------------

// Hexagon
Hexagon = function(latlng, theMap)
{
	var x = latlng.lat;
	var y = latlng.lng;

	this.map = theMap;

	this.points = [
		[x, y],
		[x + Hexagon.static.x1, y - Hexagon.static.y1],
		[x + Hexagon.static.width, y],
		[x + Hexagon.static.width, y + Hexagon.static.side],
		[x + Hexagon.static.x1, y + Hexagon.static.side + Hexagon.static.y1],
		[x, y + Hexagon.static.side]
	];
	return this;
};

Hexagon.prototype.select = function()
{
	this.polygon.setStyle({color: '#F00', weight: 5});
	this.selected = true;
}

Hexagon.prototype.deselect = function()
{
	this.polygon.setStyle({color: '#FFF', weight: 1});
	this.selected = false;
}

Hexagon.prototype.color = function(color)
{
	this.polygon.setStyle({fillOpacity: 0.5, fillColor: color});
}

// Draw the Hexagon
Hexagon.prototype.draw = function()
{
	var options = {
		color: '#FFF',
		weight: 1,
		opacity: 1,
		fillOpacity: 0,
		fillColor: '#F00'	};

	var hex = this;

	this.polygon = L.polygon(this.points, options).addTo(this.map)
	.on('click', function(e)
	{
		if ( e.target.hex.selected == false )
		{
			hex.select();
		}
		else
		{
			hex.deselect();
		}
	});
	return this;
};

Hexagon.prototype.delete = function()
{

}

Hexagon.prototype.getCenter = function()
{
	return new L.LatLng(this.centerX, this.centerY);
};

// Hexagon Static Variables
if ( continent.slug == 'indar' || continent.slug == 'esamir' )
{
	Hexagon.static = {
		width: 6.25,
		height: 7.07
	};
}
else
{
	Hexagon.static = {
		width: 10.465,
		height: 11.86
	};
}

(function()
{
	// Hexagon Calculations
	var a = -3.0;
	var b = (-2.0 * Hexagon.static.width);
	var c = (Math.pow(Hexagon.static.width, 2)) + (Math.pow(Hexagon.static.height, 2));
	Hexagon.static.side = (-b - Math.sqrt(Math.pow(b, 2) - (4.0*a*c)))/(2.0*a);
	Hexagon.static.x1 = Hexagon.static.width / 2;
	Hexagon.static.y1 = (Hexagon.static.height - Hexagon.static.side) / 2;
})();

//--------------------------------------------------------------------------
// Hexagon Grid Creation
//--------------------------------------------------------------------------

function HexGrid(origin)
{
	// X,Y Origin of Hex Grid
	this.originX = origin.x;
	this.originY = origin.y;

	this.hexes = [];
	this.labels = [];

	// Hexagon Size Calculations
	var a = -3.0;
	var b = (-2.0 * Hexagon.static.width);
	var c = (Math.pow(Hexagon.static.width, 2)) + (Math.pow(Hexagon.static.height, 2));
	Hexagon.static.side = (-b - Math.sqrt(Math.pow(b, 2) - (4.0*a*c)))/(2.0*a);
	var x = (Hexagon.static.width-Hexagon.static.side)/2.0;
	var y = Hexagon.static.height/2.0;

	// Grid Creation
	var row = 0;
	var col = 0;
	var y = this.originY;
	var offset = 0;

	while ( y + Hexagon.static.height <= 250 )
	{
		if ( row % 2 == 1 )
		{
			offset = Hexagon.static.width/2;
			col = 1;
		}
		else
		{
			offset = 0;
			col = 0;
		}

		var x = offset + this.originX;
		while ( x + Hexagon.static.width <= 250 )
		{
			// Hex Creation
			var hex = new Hexagon(new L.LatLng(x,y), map).draw();
			hex.selected = false;
			hex.col = col;
			hex.row = row;
			hex.coordX = (row+col)/2;
			hex.coordY = row;
			hex.x = x;
			hex.y = y;
			hex.centerX = x + Hexagon.static.width/2;
			hex.centerY = y + Hexagon.static.side/2;
			hex.polygon.hex = hex;

			if ( !this.hexes[hex.coordX] )
				this.hexes[hex.coordX] = [];
			this.hexes[hex.coordX][hex.coordY] = hex;

			// Hex Label
			this.labels.push(new L.DivLayer([hex.centerX, hex.centerY], { content: hex.coordX+','+hex.coordY, css: {fontSize:'12px'}}).addTo(map));

			col+=2;
			x+= Hexagon.static.width;
		}

		row+=1;
		y+= (Hexagon.static.height-Hexagon.static.side)/2 + Hexagon.static.side;
	}
}

HexGrid.prototype.delete = function()
{
	for( hex in this.hexes )
	{

	}
}

// if ( continent.slug == 'indar' || continent.slug == 'esamir' )
// 	var hexOrigin = {x:6.15, y:3.5};
// else
// 	var hexOrigin = {x:2.46, y:0.9};
// var grid = new HexGrid(hexOrigin);
