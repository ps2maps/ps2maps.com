<?php

namespace Hex;

class Hexagon
{
 	public $vertices;
 	public $sides;

	function __construct($params, $coord)
	{
		extract($params);

		// Determine column,row and x,y coordinate
		$row = $coord->y;
		$col = 2*$coord->x - $coord->y;
		$x = $originX + $col/2*$width;
		if ( $row%2 == 1 )
		{
			$tmp = floor($row/2);
			$y = $originY + ($tmp+1)*$height + $tmp*$side - ($height - $side)/2;
		}
		else
		{
			$y = $originY + ($row*$height + $row*$side)/2;
		}

		// Determine Vertices
		$x1 = $width/2;
		$y1 = ($height - $side)/2;
		$this->vertices = array(
			new PolygonVertex($x, $y),
			new PolygonVertex($x + $x1, $y - $y1),
			new PolygonVertex($x + $width, $y),
			new PolygonVertex($x + $width, $y + $side),
			new PolygonVertex($x + $x1, $y + $side + $y1),
			new PolygonVertex($x, $y + $side)
		);

		// Determine Sides
		$this->sides = array(
			new PolygonLine($this->vertices[0], $this->vertices[1]),
			new PolygonLine($this->vertices[1], $this->vertices[2]),
			new PolygonLine($this->vertices[2], $this->vertices[3]),
			new PolygonLine($this->vertices[3], $this->vertices[4]),
			new PolygonLine($this->vertices[4], $this->vertices[5]),
			new PolygonLine($this->vertices[5], $this->vertices[0])
		);
	}
}
