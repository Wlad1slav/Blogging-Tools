<?php

use App\Http\Controllers\PersonalInformationController;
use App\Http\Controllers\PostsController;
use Illuminate\Support\Facades\Route;


Route::get('/posts', [PostsController::class, 'get']);
Route::post('/post/create', [PostsController::class, 'store']);

Route::get('/personal_information', [PersonalInformationController::class, 'get']);
