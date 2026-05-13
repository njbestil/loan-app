<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;
    protected $table = 'applications';
    protected $fillable = [
        'user_id', 
        'credit_score_id', 
        'risk_score_id', 
        'credit_score', 
        'credit_score_details', 
        'risk_score', 
        'risk_score_details', 
        'remarks', 
        'status'
    ];
}
