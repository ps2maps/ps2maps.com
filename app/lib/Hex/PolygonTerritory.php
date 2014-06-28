<?php

namespace Hex;

class PolygonTerritory
{
	public $sides = array();

	function __construct($hexes)
	{
		foreach( $hexes as $hex )
			$this->sides = array_merge($this->sides, $hex->sides);

		$this->stripDuplicates();
		return $this;
	}

	private function stripDuplicates()
	{
		// Remove any sides that occur more than once in the array
		$tmp = array();
		$len = count($this->sides);

		for( $c=0; $c<$len; $c++ )
		{
			$count = 1;
			for( $d=0; $d<$len; $d++ )
			{
				if ( $c == $d )
					continue;

				if ( $this->sides[$c]->equals($this->sides[$d]) )
				{
					$count++;
					break;
				}
			}
			if ( $count == 1 )
				array_push($tmp, $this->sides[$c]);
		}
		$this->sides = $tmp;
	}

	public function vertices()
	{
		$tmp = $this->sides;

		$randomKey = array_rand($tmp);
		$vertices = array( $tmp[$randomKey]->v1, $tmp[$randomKey]->v2 );
		unset($tmp[$randomKey]);

		while( count($tmp) > 0 )
		{
			foreach ( $tmp as $key => $value )
			{
				if ( $value->v1->equals(end($vertices)) )
				{
					array_push($vertices, $value->v2);
					unset($tmp[$key]);
					break;
				}
			}
		}
		array_pop($vertices);

		return $vertices;
	}
}
