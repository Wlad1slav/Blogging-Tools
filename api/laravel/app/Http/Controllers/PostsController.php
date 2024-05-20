<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostsController extends Controller
{
    /*
     * Controller for working with blog's posts
     */
    public function get(): array
    {
        // Returns all blog posts sorted by creation date
        return DB::select('SELECT * FROM `posts` ORDER BY created_at DESC');
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
