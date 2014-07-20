// {{ $continent->name }} - Generated: {{ $carbon->toDateTimeString() }} {{ $carbon->timezoneName }}

var {{ $continent->slug }} = {
	regions : {{ $regions }},
	markers : {
		facilities: {{ $facilities }}
	}
};
