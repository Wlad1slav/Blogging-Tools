<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class UserExist
{
    /**
     * @param Request $request
     * @param Closure $next
     * @return \Illuminate\Http\RedirectResponse|mixed
     *
     * If there is no user who could log in yet,
     * it is redirected to the registration page
     */
    public function handle(Request $request, Closure $next): mixed
    {
        // If there is no blog owner in the blog,
        // then it redirects to the blog owner's registration form.
        if (User::all()->count() === 0) {
            return redirect()->route('register');
        }

        // Otherwise, proceed with the request
        return $next($request);
    }
}
