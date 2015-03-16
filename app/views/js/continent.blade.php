// {{ $continent->name }} - Generated: {{ $carbon->toDateTimeString() }} {{ $carbon->timezoneName }}

var {{ $continent->slug }} = {
	id: {{ $continent->id }},
	name: "{{ $continent->name }}",
	slug: "{{ $continent->slug }}",
	regions : {{ $regions }},
	facilities: {{ $facilities }}
};
