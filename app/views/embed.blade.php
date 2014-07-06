<html>
<head>
	<title></title>

	<script>var continent = { slug: 'indar' };</script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js"></script>
	<script src="/js/indar.js"></script>
	<style>
		body { background-color: #051112;}
	</style>
</head>
<body>

<script>
var width = 768;
var height = 768;
var paper = Raphael(0, 0, width,height);
paper.setViewBox(0,0,width,height,true);
paper.setSize('100%', '100%');

paper.image('/img/indar.jpg',0,0,768,768);

paper.setStart();
for( i in territory_data ) {
	var data = territory_data[i];
	var pathString = "M"+(data.points[0][0])+","+(data.points[0][1]);
	for( c=1; c < data.points.length; c++ ) {
		pathString += "L"+(data.points[c][0])+","+(data.points[c][1]);
	}
	pathString += "z";

	var path = paper.path(pathString);
	path.attr('fill','red');
	path.attr('fill-opacity','0.5');
	path.attr('stroke','#FFF');
}
var set = paper.setFinish();
var offset = {
	'tx': 8,
	'ty': 8,
	'r': 0,
	'sx': 2.88,
	'sy': 2.88
}
set.transform("T" + offset.tx + "," + offset.ty + "R" + offset.r + "S" + offset.sx + "," + offset.sy + ",0,0");

</script>

</body>
</html>
