<?php

use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\Blog\PostCreateController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /**
     * Blog control
     */
    // Form for creating a new post
    Route::get('/blog/post/create', [PostCreateController::class, 'create'])->name('blog.post.create');

    // Saving the post in the database
    Route::post('/blog/post/create', [PostCreateController::class, 'store'])->name('blog.post.store');
});

require __DIR__.'/auth.php';
