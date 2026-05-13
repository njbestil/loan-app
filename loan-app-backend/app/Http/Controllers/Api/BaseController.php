<?php


namespace App\Http\Controllers\Api;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;
use Illuminate\Support\Facades\File;

class BaseController extends Controller
{
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendResponse($result, $message)
    {
    	$response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];


        return response()->json($response, 200);
    }


    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendError($error, $errorMessages = [], $code = 404)
    {
    	$response = [
            'success' => false,
            'message' => $error,
        ];


        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }


        return response()->json($response, $code);
    }

    /**
     *  return 10 character code
     */

    function generateCode($company = null) {
        $code = '';
        $company_code = strtoupper(substr($company, 0, 3));

        // Generate 4 random alphabetic characters
        $alphabetic = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for ($i = 0; $i < 4; $i++) {
            $code .= $alphabetic[rand(0, strlen($alphabetic) - 1)];
        }
    
        // Generate 6 random digits
        for ($i = 0; $i < 6; $i++) {
            $code .= rand(0, 9);
        }
    
        return ($company_code)? $company_code."-".$code : $code;
    }

    function storeFile($path, $fileName, $fileExtension, $base64) {
        try {
            $decodedContent = base64_decode($base64);
            $path = "";
    
            if ($decodedContent !== false) {
                $fileName = $fileName.$fileExtension; // Set the desired file name and extension
    
                $path = public_path('images/news/'.$fileName); // Save the file in the storage/public directory
                
                file_put_contents($path, $decodedContent);
            }
        } catch (\Throwable $th) {
            //throw $th;
            return false;
        }

        return true;
    }

    function deleteFile($path, $filename)
    {
        $filePath = public_path($path . $filename);

        if (File::exists($filePath)) {
            // File exists, delete it
            File::delete($filePath);

            return true;
        } else {
            // File does not exist
            return false;
        }
    }
}