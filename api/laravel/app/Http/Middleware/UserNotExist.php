<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class UserNotExist
{
    /**
     * @param Request $request
     * @param Closure $next
     * @return \Illuminate\Http\RedirectResponse|mixed
     *
     * The application can have only one user who will manage the blog.
     * This Middleware is needed to be sure that no one can register and
     * use the web application except for one user.
     */
    public function handle(Request $request, Closure $next): mixed
    {
        // Check if any user exists
        if (User::all()->count() > 0) {
            // Redirect to the login page if a user exists
            return redirect()->route('login');
        }

        // Otherwise, proceed with the request
        return $next($request);
    }
}
