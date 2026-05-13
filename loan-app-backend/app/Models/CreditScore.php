<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditScore extends Model
{
    use HasFactory;
    protected $table = 'credit_scores';
    protected $fillable = [
        'name', 
        'passing_score', 
        'score_form'
    ];
}
