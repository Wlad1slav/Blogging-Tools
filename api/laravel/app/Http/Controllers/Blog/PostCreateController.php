<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class PostCreateController extends Controller
{
    /**
     * Form for creating a new post
     */
    public function create(): Response
    {
        return Inertia::render('Blog/Post/Create', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Insert a new post to the database
     */
    public function store(Request $request): void
    {

        $request->validate([
            'title' => ['max:255', 'nullable'],
            'content' => 'required|string',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
        ]);

        $images = []; // Paths to images

        if($request->hasfile('images'))
        {
            foreach($request->file('images') as $file)
            {
                $fileDirectory = env('PUBLIC_DIRECTORY_FULL_PATH').'/images';
                $fileName = time().rand(1,100).'.'.$file->extension();
                $file->move($fileDirectory, $fileName); // Save the file

                // Saving the file name in an array of all images
                $images[] .= $fileName;
            }
        }

        DB::insert(
            'INSERT INTO `posts` (`title`, `text`, `images`, `created_at`) VALUES (?, ?, ?, ?)',
            [$request['title'] ?? null, $request['content'] ?? '', json_encode($images), date('Y-m-d H:i:s')]
        );
    }

}
