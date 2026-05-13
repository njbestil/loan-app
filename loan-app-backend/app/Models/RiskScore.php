<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiskScore extends Model
{
    use HasFactory;
    protected $table = 'risk_scores';
    protected $fillable = [
        'name', 
        'passing_score', 
        'score_form'
    ];
}
