<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostsController extends Controller
{
    /*
     * Controller for working with blog's posts
     */
    public function getAll(): \Illuminate\Database\Eloquent\Collection
    {
        // Returns all blog posts sorted by creation date
        return Post::all();
    }

    public function get(Request $request): Post
    {
        return Post::find($request['id']);
    }

    public function store(Request $request): void
    {
        date_default_timezone_set('Europe/Kiev');

        if (env('APP_KEY') === $request['key'])
            // Insert a new post to the database
            DB::insert(
                'INSERT INTO `posts` (`title`, `text`, `images`, `created_at`) VALUES (?, ?, ?, ?)',
                [$request['title'] ?? null, $request['content'] ?? '', json_encode($request['images']) ?? null, date('Y-m-d H:i:s')]
            );
        else abort(403, 'Invalid API key.');
    }
}
