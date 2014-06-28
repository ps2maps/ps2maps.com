<?php

namespace Hex;

class PolygonVertex
{
	public $x;
	public $y;

	function __construct($x, $y)
	{
		$this->x = round((float)$x, 3);
		$this->y = round((float)$y, 3);
	}

	public function equals($vertex)
	{
		if ( $this->x == $vertex->x and $this->y == $vertex->y )
			return true;
		else
			return false;
	}
}
