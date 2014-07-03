function Ps2maps()
{
	this.layers = {};
	this.styles = {};
	this.options = {
		'regions' : {
			'default' :  {
				weight: 1.2,
				color: '#333',
				opacity: 1,
				fillOpacity: 0
			}
		}
	};
}

var ps2maps = new Ps2maps();
