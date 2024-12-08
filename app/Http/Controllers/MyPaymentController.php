<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use PayPalCheckoutSdk\Core\PayPalHttpClient;
use PayPalCheckoutSdk\Core\SandboxEnvironment;
use PayPalCheckoutSdk\Orders\OrdersCreateRequest;
use PayPalCheckoutSdk\Orders\OrdersCaptureRequest;
use Inertia\Inertia;
use App\Models\MyPayment;
use App\Models\CustomOrder; 
use App\Http\Requests\StoreMyPaymentRequest;
use App\Http\Requests\UpdateMyPaymentRequest;
use Illuminate\Support\Facades\DB; // Use DB for transaction handling


class MyPaymentController extends Controller
{
    private $client;

    public function __construct()
    {
        $clientId ='';
        $clientSecret = '';
        $environment = new SandboxEnvironment($clientId, $clientSecret);
        $this->client = new PayPalHttpClient($environment);
    }

   
    // Create Order and return PayPal order ID
    public function createOrder(Request $request)
    {
        $orderRequest = new OrdersCreateRequest();
        $orderRequest->prefer('return=representation');
    
        // Ensure amount is numeric
        if (!is_numeric($request->amount)) {
            return response()->json(['error' => 'Invalid amount'], 400);
        }
    
        $orderRequest->body = [
            "intent" => "CAPTURE",
            "purchase_units" => [[
                "amount" => [
                    "currency_code" => "USD",
                    "value" => number_format($request->amount, 2, '.', '') // Format amount correctly
                ]
            ]],
            "application_context" => [
                "cancel_url" => route('paypal.cancel'),
                "return_url" => route('paypal.success')
            ]
        ];
    
        try {
            $response = $this->client->execute($orderRequest);
            return response()->json($response->result);
        } catch (\Exception $ex) {
            \Log::error('PayPal Create Order Error: ' . $ex->getMessage()); // Log the error
            return response()->json(['error' => $ex->getMessage()], 500);
        }
    }
    
 
    
    public function success(Request $request)
{
    DB::beginTransaction(); // Start transaction to handle both order and payment together

    try {
        // Step 1: Insert the order details
        $customOrder = new CustomOrder();
        $customOrder->user_id = $request->user_id; // Pass user ID from the frontend
        $customOrder->total_amount = $request->total_amount; // Total amount for the order
        $customOrder->status = 'pending'; // Set initial status to pending
        $customOrder->save(); // Insert the order into the database

        // Step 2: Capture PayPal Payment
        $orderID = $request->orderID; // PayPal Order ID from frontend
        $captureRequest = new OrdersCaptureRequest($orderID);
        $captureRequest->prefer('return=representation');
        $response = $this->client->execute($captureRequest);

        // Log the full response for debugging
        \Log::info('PayPal capture response:', (array) $response->result);

        // Step 3: Extract PayPal payment details
        $paymentData = $response->result;
        $transactionId = $paymentData->id;
        $amount = $paymentData->purchase_units[0]->payments->captures[0]->amount->value;
        $paymentStatus = $paymentData->purchase_units[0]->payments->captures[0]->status;

        // Step 4: Insert the payment details and link to the custom order
        $payment = new MyPayment();
        $payment->custom_orders_id = $customOrder->id; // Link to the custom order
        $payment->payment_method = 'PayPal';
        $payment->transaction_id = $transactionId;
        $payment->amount = $amount;
        $payment->amopayment_status = $paymentStatus;
        $payment->payment_data = json_encode($paymentData); // Store full PayPal response
        $payment->save(); // Insert payment into the database

        DB::commit(); // Commit transaction

        // Return success response
        return response()->json([
            'status' => 'success',
            'order_id' => $customOrder->id,
            'transaction_id' => $transactionId
        ]);
    } catch (\Exception $ex) {
        DB::rollBack(); // Rollback if any error occurs
        \Log::error('Order and Payment Error: ' . $ex->getMessage() . ' Request: ' . json_encode($request->all()));

        return response()->json([
            'error' => $ex->getMessage()
        ], 500);
    }
}



    // Handle canceled payment
    public function cancel()
    {
        return response()->json(['status' => 'cancel']);
    }



    public function index()
    {
    Return Inertia::render('Order_And_Payment/PaymentProcess');
    }

    
    public function create()
    {
    
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
