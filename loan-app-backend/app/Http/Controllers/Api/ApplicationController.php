<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController as BaseController;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ApplicationController extends BaseController
{
    /**
     * Display a listing of the applications.
     */
    public function index()
    {
        $applications = Application::latest()->get();
        return $this->sendResponse($applications, 'Applications retrieved successfully.');
    }

    /**
     * Store a newly created application in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'credit_score_id' => 'required|exists:credit_scores,id',
            'risk_score_id' => 'required|exists:risk_scores,id',
            'credit_score' => 'required|string',
            'credit_score_details' => 'required|string',
            'risk_score' => 'required|string',
            'risk_score_details' => 'required|string',
            'status' => 'required|string',
        ]);

        $application = Application::create($request->all());

        return $this->sendResponse($application, 'Application created successfully.', Response::HTTP_CREATED);
    }

    /**
     * Display the specified application.
     */
    public function show($id)
    {
        $application = Application::find($id);

        if (!$application) {
            return $this->sendError('Application not found.', Response::HTTP_NOT_FOUND);
        }

        return $this->sendResponse($application, 'Application retrieved successfully.');
    }

    /**
     * Update the specified application in storage.
     */
    public function update(Request $request, $id)
    {
        $application = Application::find($id);

        if (!$application) {
            return $this->sendError('Application not found.', Response::HTTP_NOT_FOUND);
        }

        $request->validate([
            'user_id' => 'exists:users,id',
            'credit_score_id' => 'exists:credit_scores,id',
            'risk_score_id' => 'exists:risk_scores,id',
            'credit_score' => 'string',
            'credit_score_details' => 'string',
            'risk_score' => 'string',
            'risk_score_details' => 'string',
            'status' => 'string',
        ]);

        $application->update($request->all());

        return $this->sendResponse($application, 'Application updated successfully.');
    }

    /**
     * Remove the specified application from storage.
     */
    public function destroy($id)
    {
        $application = Application::find($id);

        if (!$application) {
            return $this->sendError('Application not found.', Response::HTTP_NOT_FOUND);
        }

        $application->delete();

        return $this->sendResponse([], 'Application deleted successfully.');
    }
}
