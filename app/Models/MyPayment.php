<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'custom_order_id',
        'payment_method', 
        'payment_status', 
        'transaction_id', 
        'amount', 
        'payment_data'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);//defines a one-to-many relationship between two Eloquent models in Laravel. It allows you to easily manage and access related records
    }
}
