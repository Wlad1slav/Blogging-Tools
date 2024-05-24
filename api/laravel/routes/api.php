<?php

use App\Http\Controllers\API\PersonalInformationController;
use App\Http\Controllers\API\PostsController;
use Illuminate\Support\Facades\Route;


Route::get('/posts', [PostsController::class, 'getAll']);
Route::get('/post', [PostsController::class, 'get']);
Route::post('/post/create', [PostsController::class, 'store']);

Route::get('/personal_information', [PersonalInformationController::class, 'get']);
