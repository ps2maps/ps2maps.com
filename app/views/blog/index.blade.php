@extends('template')

@section('content')

<div class='container'>

	<div class='row'>

		<div class='col-sm-4 col-sm-offset-2'>
			<div class='rss-container'>
				<a href="{{ URL::to('/blog/rss') }}" target='_blank'>
					<img src="{{ URL::to('/img/rss.png') }}"/> Blog RSS Feed
				</a>
			</div>
		</div>
		<div class='col-sm-4'>
			<div class='pull-right'>
				@include('social')
			</div>
		</div>

	</div>

	<div class='row'>

		<div class='col-sm-10 col-md-12 col-sm-offset-1 col-md-offset-0'>

			@foreach( $posts as $post )

			<?php $date = new DateTime($post->published_at); ?>

			<div class='post'>

				<a href='{{URL::to('blog/'.$post->slug)}}'>
					<h3>{{ $post->title }}</h3>
				</a>

				<a href='{{URL::to('blog/'.$post->slug)}}'>
					<img src='{{URL::to($post->image)}}' class='img-responsive'/>
				</a>

				<h4>{{ $date->format('F j, Y')}}</h4>

				{{ $post->excerpt }}

				<a href='{{URL::to('blog/'.$post->slug)}}'>Read More...</a>

				<hr>
			</div>

			@endforeach

		</div>

	</div>

</div>


@stop
