<?php

class Facility extends Eloquent
{
	public $incrementing = false;

	public $fillable = array(
		'id',
		'name',
		'slug',
		'continent_id',
		'facility_type_id',
		'region_id',
		'x',
		'y',
		'z',
		'currency_amount',
		'currency_id',
	);

	public function setXAttribute($value)
	{
		$this->attributes['x'] = number_format(round($value, 2),2,'.','');
	}

	public function setYAttribute($value)
	{
		$this->attributes['y'] = number_format(round($value, 2),2,'.','');
	}

	public function setZAttribute($value)
	{
		$this->attributes['z'] = number_format(round($value, 2),2,'.','');
	}

	public function continent()
	{
		return $this->belongsTo('Continent');
	}

	public function currency()
	{
		return $this->belongsTo('Currency');
	}

	public function facilityType()
	{
		return $this->belongsTo('FacilityType');
	}

	public function region()
	{
		return $this->belongsTo('Region');
	}

	public function linkedFacilities()
	{
		return $this->belongsToMany('Facility', 'links', 'facility_id_a', 'facility_id_b');
	}
}
