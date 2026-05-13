<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class RegisterController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $request->validate([
            'admin_id' => 'required',
            'fname' => 'required',
            'lname' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'c_password' => 'required|same:password',
            'role' => 'required',
        ], [
            'same' => 'The confirm password and password must match.'
        ]);

        try {
            $input = $request->all();
            $input['password'] = bcrypt($input['password']);

            // Determine if the user is admin
            $isAdmin = isset($input['role']) && $input['role'] === 'admin';

            // Only set email_verified_at if user is admin, with specific datetime format
            if (!$isAdmin) {
                $input['email_verified_at'] = Carbon::now();
            }

            $user = User::create($input);

            $success = [
                "id" => $user->id,
                "fname" => $user->fname,
                "role" => $user->role,
                "token" => $user->createToken('loanapp')->accessToken
            ];

            if ($isAdmin) {
                $mailRequest = new Request([
                    "id" => $user->id,
                    "name" => $user->fname,
                    "email" => $user->email
                ]);

                resolve(SendMailController::class)->verifyEmail($mailRequest);
            }
        } catch (\Throwable $th) {
            return $this->sendError('Something went wrong', $th->getMessage(), 500);
        }

        return $this->sendResponse($success, 'User registered successfully.');
    }


    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            if ($user->email_verified_at) {
                $success = [
                    "id" => $user->id,
                    "fname" => $user->fname,
                    "role" => $user->role,
                    "token" => $user->createToken('loanapp')->accessToken
                ];

                return $this->sendResponse($success, 'User logged in successfully.');
            } else {
                return $this->sendError('Verify Email', ['error' => ['Email needs to be verified']], 403);
            }
        } else {
            return $this->sendError('Unauthorized.', ['error' => ['Email or password must be valid']], 401);
        }
    }
}
