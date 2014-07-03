<?php

Class BlogController extends BaseController
{
	public function index()
	{
		$posts = Post::where('published','=','yes')
			->orderBy('published_at','desc')
			->get();

		return View::make('blog/index', compact('posts'));
	}

	public function article($slug)
	{
		$post = Post::where('slug','=',$slug)
			->where('published','=','yes')
			->first();

		if ( is_null($post) )
			return App::abort('404');

		return View::make('blog/post', compact('post'));
	}

	public function rss()
	{
		echo "rss";
	}


}
