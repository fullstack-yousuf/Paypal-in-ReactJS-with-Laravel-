<?php

namespace App\Http\Controllers;

use App\Models\CustomOrder;
use App\Http\Requests\StoreCustomOrderRequest;
use App\Http\Requests\UpdateCustomOrderRequest;

class CustomOrderController extends Controller
{
    
    public function index()
    {
        //  
    }

    
    public function create(Request $request)
    {
        $Order = Order::create([
           'user_id' => Auth::user()->id,
           'total_amount' => $request->total_amount,
           'status' => 'pending',
        ]);
        
        return response()->json($order, 201);//automatic way to handle API responses
    }

   
    public function store(StoreCustomOrderRequest $request)
    {
        //
    }

    public function show(CustomOrder $customOrder)
    {
        return response()->json(201);//automatic way to handle API responses
    }

    public function edit(CustomOrder $customOrder)
    {
        //
    }

    public function update(UpdateCustomOrderRequest $request, CustomOrder $customOrder)
    {
        //
    }

    
    public function destroy(CustomOrder $customOrder)
    {
        //
    }
}
