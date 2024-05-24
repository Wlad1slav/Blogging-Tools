<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

/**
 * Controller for working with blog's posts
 */
class PostsController extends Controller
{

    public function getAll(): \Illuminate\Database\Eloquent\Collection
    {
        // Returns all blog posts sorted by creation date
        return Post::orderBy('created_at', 'desc')->get();
    }

    public function get(Request $request): Post
    {
        $request->validate([
            'id' => ['exists:posts'],
        ]);

        return Post::find($request['id']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     * API request to create a new post
     */
    public function store(Request $request): mixed
    {
        // Validates the API key
        if (env('APP_KEY') !== $request['key']) {
            // If the key is incorrect, returns an error
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate([
            'title' => ['max:255', 'nullable'],
            'content' => ['required'],
            'images' => ['nullable'],
        ]);

        return Post::create([
            'title' => $request['title'],
            'text' => $request['content'],
            'images' => json_encode($request['images']),
            'created_at' => date('Y-m-d H:i:s')
        ]);
    }
}
