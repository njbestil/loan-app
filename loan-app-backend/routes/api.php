<?php

use App\Http\Controllers\Api\ApplicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\SendMailController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RiskScoreController;
use App\Http\Controllers\Api\CreditScoreController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login']);

// SendMail APIs
Route::post('sendMail', [SendMailController::class, 'inquiryEmail']);
Route::post('email/resetpassword', [SendMailController::class, 'resetPassword']);
Route::get('email/verify/{id}', [UserController::class, 'verifyEmail']);

Route::middleware('auth:api')->group( function () {
    Route::resource('user', UserController::class);
    Route::post('user/changepassword/{id}', [UserController::class, 'changePassword']);

    // Credit Score APIs
    Route::resource('application', ApplicationController::class);

    // Credit Score APIs
    Route::resource('creditscore', CreditScoreController::class);

    // Risk Score APIs
    Route::resource('riskscore', RiskScoreController::class);
});