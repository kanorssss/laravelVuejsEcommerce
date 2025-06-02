<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember' => 'boolean',
        ]);
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'message' => 'Invalid Credentials'
            ], 422);
        }

        $user = Auth::user();
        if (!$user->is_admin) {
            Auth::logout();

            return response([
                'message' => 'You are not authorized to access this page'
            ]);
        }
        $token = $user->createToken('main')->plainTextToken;


        return response([
            // pass the user resource to the response to get the user data
            'user' => new UserResource($user),
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response([
            '',
            204
        ]);
    }
    public function getUser(Request $request)
    {
        //return the user resource from the request
        return new UserResource($request->user());
    }
}