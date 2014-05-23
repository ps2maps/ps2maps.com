<?php

Class BlogController extends BaseController
{
	public function getIndex()
	{
		$posts = Post::where('published','=','yes')
			->orderBy('published_at','desc')
			->get();

		return View::make('blog/index', compact('posts'));
	}

	public function getArticle($slug)
	{
		echo "article";
	}

	public function getRss()
	{
		echo "rss";
	}


}
