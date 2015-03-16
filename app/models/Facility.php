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
		'currency_amount',
		'currency_id',
		'lat',
		'lng',
		'elevation',
		'lat_override',
		'lng_override',
		'elevation_override',
	);

	private $precision = 2;

	public function setLatAttribute($value)
	{
		$this->attributes['lat'] = $this->numberFormat($value);
	}

	public function setLngAttribute($value)
	{
		$this->attributes['lng'] = $this->numberFormat($value);
	}

	public function setElevationAttribute($value)
	{
		$this->attributes['elevation'] = $this->numberFormat($value);
	}

	public function setLatOverrideAttribute($value)
	{
		$this->attributes['lat_override'] = $this->numberFormat($value);
	}

	public function setLngOverrideAttribute($value)
	{
		$this->attributes['lng_override'] = $this->numberFormat($value);
	}

	public function setElevationOverrideAttribute($value)
	{
		$this->attributes['elevation_override'] = $this->numberFormat($value);
	}

	private function numberFormat($value)
	{
		if ( is_null($value) ) {
			return $value;
		}	else {
			return number_format(round($value, $this->precision),$this->precision,'.','');
		}
	}

	public function setNameAttribute($value)
	{
		$this->attributes['name'] = trim($value);
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
