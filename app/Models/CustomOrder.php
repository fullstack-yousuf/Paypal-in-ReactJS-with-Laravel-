<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomOrder extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'total_amount',
        'status'
    ];
    
    public function payments()
    {
        return $this->hasMany(Payment::class);//defines a one-to-many relationship between two Eloquent models in Laravel. It allows you to easily manage and access related records
    }
}
