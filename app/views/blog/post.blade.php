@extends('template')

@section('content')

<?php

$title = "PlanetSide 2 Maps Blog - ". $post->title;

$date = new DateTime($post->published_at);

?>

<div class='container'>

	<div class='row'>
		<div class='col-sm-10 col-sm-offset-1'>
			<a href='{{URL::to('blog')}}'>&laquo; Back to the Blog</a>
			<div class='rss-container'>
				<a href="{{ URL::to('/blog/rss') }}" target='_blank'>
					<img src="{{ URL::to('/img/rss.png') }}"/> Blog RSS Feed
				</a>
			</div>
		</div>
	</div>

	<div class='row'>
		<div class='col-sm-4'>
			<div class='pull-right'>
				@include('social')
			</div>
		</div>
	</div>

	<div class='row'>

		<div class='col-sm-10 col-sm-offset-1'>

			<div class='post'>
				<h3>{{ $post->title }}</h3>
				<img src='{{URL::to($post->image)}}'/>

				<h4>{{ $date->format('F j, Y')}}</h4>

				{{ $post->content }}
			</div>

			@include('blog/disqus')

		</div>

	</div>

</div>


@stop
