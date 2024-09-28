<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\MyPayment;
use App\Http\Requests\StoreMyPaymentRequest;
use App\Http\Requests\UpdateMyPaymentRequest;

class MyPaymentController extends Controller
{
    
    public function index()
    {
    Return Inertia::render('Order_And_Payment/PaymentProcess');
    }

    
    public function create()
    {
        // $order = Order::findOrFail($request->custom_order_id);

        // if(!$order){
        //     return response()->json(['error message' => 'Order not found'], 404);//automatic way to handle API responses
        // }

        // $payment = Payment::create([
        //     'custom_order_id' => $custom_order->id,
        //     'payment_method' => $request->payment_method,
        //     'payment_status' => 'success', // Assuming success for simplicity
        //     'transaction_id' => 'TXN123456', // From the payment gateway
        //     'amount' => $request->amount,
        //     'payment_data' => json_encode(['gateway_response' => 'Sample Response']),
        // ]);

        // $order->update(['status' => 'completed']);

        // return response()->json($payment, 201);
    }

    
    public function store(StoreMyPaymentRequest $request)
    {
        //
    }

   
    public function show(MyPayment $myPayment)
    {
        //
    }

    
    public function edit(MyPayment $myPayment)
    {
        //
    }

    
    public function update(UpdateMyPaymentRequest $request, MyPayment $myPayment)
    {
        //
    }

    
    public function destroy(MyPayment $myPayment)
    {
        //
    }
}
