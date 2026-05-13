<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\RiskScore;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RiskScoreController extends BaseController
{
    /**
     * Display a listing of the risk scores.
     */
    public function index()
    {
        $riskScores = RiskScore::all();
        return $this->sendResponse($riskScores, 'Risk scores retrieved successfully.');
    }

    /**
     * Store a newly created risk score in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:risk_scores,name',
            'passing_score' => 'required|string',
            'score_form' => 'required|string',
        ]);

        $riskScore = RiskScore::create($request->all());

        return $this->sendResponse($riskScore, 'Risk score created successfully.', Response::HTTP_CREATED);
    }

    /**
     * Display the specified risk score.
     */
    public function show($id)
    {
        $riskScore = RiskScore::find($id);

        if (!$riskScore) {
            return $this->sendError('Risk score not found.', [], Response::HTTP_NOT_FOUND);
        }

        return $this->sendResponse($riskScore, 'Risk score retrieved successfully.');
    }

    /**
     * Update the specified risk score in storage.
     */
    public function update(Request $request, $id)
    {
        $riskScore = RiskScore::find($id);

        if (!$riskScore) {
            return $this->sendError('Risk score not found.', [], Response::HTTP_NOT_FOUND);
        }

        $request->validate([
            'name' => 'sometimes|string|unique:risk_scores,name',
            'passing_score' => 'sometimes|string',
            'score_form' => 'sometimes|string',
        ]);

        $riskScore->update($request->all());

        return $this->sendResponse($riskScore, 'Risk score updated successfully.');
    }

    /**
     * Remove the specified risk score from storage.
     */
    public function destroy($id)
    {
        $riskScore = RiskScore::find($id);

        if (!$riskScore) {
            return $this->sendError('Risk score not found.', [], Response::HTTP_NOT_FOUND);
        }

        // Set is_deleted to true instead of deleting the record
        $riskScore->is_deleted = true;
        $riskScore->save();
        //$riskScore->delete();

        return $this->sendResponse([], 'Risk score deleted successfully.');
    }
}