<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\CreditScore;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CreditScoreController extends BaseController
{
    /**
     * Display a listing of the credit scores.
     */
    public function index()
    {
        $creditScores = CreditScore::all();
        return $this->sendResponse($creditScores, 'Credit scores retrieved successfully.');
    }

    /**
     * Store a newly created credit score in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:credit_scores,name',
            'passing_score' => 'required|string',
            'score_form' => 'required|string',
        ]);

        $creditScore = CreditScore::create($validatedData);
        return $this->sendResponse($creditScore, 'Credit score created successfully.', Response::HTTP_CREATED);
    }

    /**
     * Display the specified credit score.
     */
    public function show($id)
    {
        $creditScore = CreditScore::find($id);
        
        if (!$creditScore) {
            return $this->sendError('Credit score not found.', [], Response::HTTP_NOT_FOUND);
        }

        return $this->sendResponse($creditScore, 'Credit score retrieved successfully.');
    }

    /**
     * Update the specified credit score in storage.
     */
    public function update(Request $request, $id)
    {
        $creditScore = CreditScore::find($id);

        if (!$creditScore) {
            return $this->sendError('Credit score not found.', [], Response::HTTP_NOT_FOUND);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255|unique:credit_scores,name',
            'passing_score' => 'sometimes|string',
            'score_form' => 'sometimes|string',
        ]);

        $creditScore->update($validatedData);
        return $this->sendResponse($creditScore, 'Credit score updated successfully.');
    }

    /**
     * Remove the specified credit score from storage.
     */
    public function destroy($id)
    {
        $creditScore = CreditScore::find($id);

        if (!$creditScore) {
            return $this->sendError('Credit score not found.', [], Response::HTTP_NOT_FOUND);
        }

        // Set is_deleted to true instead of deleting the record
        $creditScore->is_deleted = true;
        $creditScore->save();
        //$creditScore->delete();
        
        return $this->sendResponse([], 'Credit score deleted successfully.');
    }
}
