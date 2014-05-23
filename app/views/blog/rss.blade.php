<?php

echo "<?xml version='1.0' encoding='utf-8'?>
<rss version='2.0' xmlns:atom='http://www.w3.org/2005/Atom'>

<channel>
	<title>PlanetSide 2 Maps</title>
	<link>http://ps2maps.com/</link>
	<description>PlanetSide 2 Maps Blog RSS Feed</description>
	<language>en</language>
	<atom:link href='http://ps2maps.com/blog/rss' rel='self' type='application/rss+xml' />";

	foreach( $posts as $post ):
	$date = new DateTime($post->published_at);

	echo "<item>
		<title>".$post->title."</title>
		<description><![CDATA[
			<img src='".URL::to($post->image)."'/><h4>".$date->format('F j, Y')."</h4>".$post->excerpt."<a href='".URL::to('blog/'.$post->slug)."'>Read More...</a>
		]]></description>
		<pubDate>".$date->format('r')."</pubDate>
		<guid isPermaLink='true'>http://ps2maps.com/blog/".$post->slug."</guid>
		<link>http://ps2maps.com/blog/".$post->slug."</link>
	</item>";
	endforeach;

echo "</channel>
</rss>";
