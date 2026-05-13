<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Response;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::latest()->get(); // Retrieve only active users

        if ($users->isEmpty()) {
            return $this->sendError('No active users found.');
        }

        return $this->sendResponse(UserResource::collection($users), 'Active users retrieved successfully.');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::find($id);

        if (is_null($user)) {
            return $this->sendError('User not found.', Response::HTTP_NOT_FOUND);
        }

        return $this->sendResponse(new UserResource($user), 'User retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'fname' => 'required|string',
            'lname' => 'required|string',
            'address' => 'required|string',
            'contact_number' => 'required|string',
            'role' => 'required|string',
        ]);

        $user = User::find($id);

        if (!$user) {
            return $this->sendError('User not found.', Response::HTTP_NOT_FOUND);
        }

        $user->update($request->only(['fname', 'lname', 'role', 'address', 'contact_number']));

        return $this->sendResponse(new UserResource($user), 'User updated successfully.');
    }

    public function approveUser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->sendError('User not found.', Response::HTTP_NOT_FOUND);
        }

        $validated = $request->validate([
            'is_active' => 'boolean',
        ]);
    
    
        // Check if validation fails
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
    
        try {
            $user->is_active = $validated['is_active'];
            $user->save();

            // Send mail
            $payload = [
                "name" => str_replace(",", " ", $user->name),
                "email" => $user->email,
                "status" => $validated['is_active'],
            ];

            if (!$request->is_approved) {
                $payload['status'] = false;
            }

            $mail_request = new Request($payload);
            resolve(SendMailController::class)->activateaccount($mail_request);
        } catch (\Throwable $th) {
            throw $th;
        }

        return $this->sendResponse([
            "user_id" => $id,
            "category" => $request->category,
            "is_approved" => $user->is_approved,
        ], 'User approval status updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->sendError('User not found.', [], Response::HTTP_NOT_FOUND);
        }
    
        // $user->delete();
        $user->is_active = false;
        $user->save();

        return $this->sendResponse([], 'User deleted successfully.');
    }

    public function getAuthUser()
    {
        $user = Auth::user();
        return $this->sendResponse(new UserResource($user), 'Active user retrieved successfully.');
    }

    public function verifyEmail($id)
    {
        $user = User::find($id);
        $currentDate = date("Y-m-d");
        $user->email_verified_at = $currentDate;
        $user->save();

        return redirect()->away('http://127.0.0.1:5173/email/verified'); // Replace with your URL
    }

    public function changePassword(Request $request, $id)
    {
        $validated = $request->validate([
            'password' => 'required|string',
            'c_password' => 'required|string|same:password',
        ]);

        $user = User::find($id);

        if (!$user) {
            return $this->sendError('User account not found.', Response::HTTP_NOT_FOUND);
        }

        try {
            $user->update(['password' => bcrypt($validated['password'])]);

            $response = [
                "fname" => $user->fname,
                "email" => $user->email,
            ];
        } catch (\Throwable $th) {
            throw $th;
        }

        return $this->sendResponse($response, 'Password reset successful.');
    }
}
