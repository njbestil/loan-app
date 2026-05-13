<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController as BaseController;
use App\Mail\SendEmail;
use App\Mail\SendEventMail;
use App\Mail\SendAccountmail;
use App\Mail\SendReminder;
use App\Mail\SendVerifyEmail;
use App\Mail\SendCareer;
use App\Mail\SendOtp;
use App\Mail\SendResetPassword;
use App\Mail\SendNotifyBooking;
use App\Models\User;
use Validator;

use Illuminate\Support\Facades\Mail;

class SendMailController extends BaseController
{
    public function inquiryEmail(Request $request)
    {
        // The email sending is done using the to method on the Mail facade
        Mail::to('mhaby143@gmail.com')->send(new SendEmail($request->subject, $request->name, $request->email, $request->message));

        return $this->sendResponse([], 'Email sent successfully.');
    }

    public function verifyEmail(Request $request)
    {
    
        // The email sending is done using the to method on the Mail facade
        Mail::to($request->email)->send(new SendVerifyEmail($request->name, $request->id));

        return $this->sendResponse([], 'Email sent successfully.');
    }

    public function career(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subject' => 'required|string',
            'code' => 'required|string',
            'name' => 'required|string',
            'email' => 'required|email',
            'mobile' => 'required|string',
            'messages' => 'required|string',
            'base64Attachment' => 'required|string'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $decodedContent = base64_decode($request->base64Attachment);
        $path = "";

        if ($decodedContent !== false) {
            $fileName = 'cv.pdf'; // Set the desired file name and extension
            $path = public_path('files/'.$fileName); // Save the file in the storage/public directory
            
            file_put_contents($path, $decodedContent);
        }

        // The email sending is done using the to method on the Mail facade
        Mail::to("career@avidhilda.com")->send(new SendCareer($request->subject, $request->code, $request->name, $request->email, $request->mobile, $request->messages, $path));

        return $this->sendResponse([], 'Email sent successfully.');
    }

    public function resetPassword(Request $request) {
        try {
            $user = User::where('email', $request->email)->first();

            if (is_null($user)) {
                return $this->sendError('Registered email is not found.');
            }
            
            $token = $user->createToken('loanapp')->accessToken;
            $reset_password_url = env('WEB_URL').'/resetpassword?tkn='.$token.'&id='.$user->id;

            // The email sending is done using the to method on the Mail facade
            Mail::to($request->email)->send(new SendResetPassword($user->name, $reset_password_url));    
        } catch (\Throwable $th) {
            throw $th;
        }
       
        return $this->sendResponse([], 'Email sent successfully.');
    }
}