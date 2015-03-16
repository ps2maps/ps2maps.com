# Grid creation
gridOptions =
	color: '#FFF'
	weight: 1
	clickable: false
	pane: 'grid'

subGridOptions =
	color: '#FFF'
	weight: 1
	clickable: false
	pane: 'subGrid'

objs = []
labels =
	1:'A'
	2:'B'
	3:'C'
	4:'D'
	5:'E'
	6:'F'
	7:'G'
	8:'H'
	9:'I'
	10:'J'
	11:'K'
	12:'L'
	13:'M'
	14:'N'
	15:'O'
	16:'P'

c = 0
x = 1

while c <= 256
	d = 0
	y = 1

	while d < 256
		# Grid Labels
		L.divLayer([c,d],	{html: labels[x] + y, className: "leaflet-divlayer gridLabel", pane: "gridLabels"}).addTo(ps2maps.map)
		d += 16
		y++

	# Grid Lines
	L.polygon([[c,0],[c,256]], gridOptions).addTo(ps2maps.map)
	L.polygon([[0,c],[256,c]], gridOptions).addTo(ps2maps.map)

	# Subgrid Lines
	if c != 256
		L.polygon([[c+5.3,0],[c+5.3,256]], subGridOptions).addTo(ps2maps.map)
		L.polygon([[c+10.6,0],[c+10.6,256]], subGridOptions).addTo(ps2maps.map)
		L.polygon([[0,c+5.3],[256,c+5.3]], subGridOptions).addTo(ps2maps.map)
		L.polygon([[0,c+10.6],[256,c+10.6]], subGridOptions).addTo(ps2maps.map)

	c += 16
	x++

ps2maps.map.getPane('grid').getRenderer().options.padding = 0.85
ps2maps.map.getPane('subGrid').getRenderer().options.padding = 0.85
