<?php

namespace Hex;

class PolygonLine
{
	public $v1;
	public $v2;

	function __construct($v1, $v2)
	{
		$this->v1 = $v1;
		$this->v2 = $v2;
	}

	public function equals($line)
	{
		if ( ( $this->v1->equals($line->v1) and $this->v2->equals($line->v2) ) or ( $this->v1->equals($line->v2) and $this->v2->equals($line->v1) ) )
			return true;
		else
			return false;
	}

	public function hasVertex($vertex)
	{
		if ( $this->v1->equals($vertex) or $this->v2->equals($vertex) )
			return true;
		else
			return false;
	}

	public function getOtherVertex($vertex)
	{
		if ( $this->v1->equals($vertex) )
			return $this->v2;
		else
			return $this->v1;
	}
}
