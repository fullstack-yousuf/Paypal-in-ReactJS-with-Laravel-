<?php


use App\Http\Controllers\CustomOrderController;
use App\Http\Controllers\MyPaymentController;

Route::middleware('auth:sanctum')->group(function (Request $request) {
    Route::post('/orders', [CustomOrderController::class, 'create']);
    Route::post('/payments', [MyPaymentController::class, 'create']);
    Route::get('/order and payment', [MyPaymentController::class, 'index']);
    

    Route::post('/paypal/capture', [MyPaymentController::class, 'captureOrder']);
    
    Route::post('paypal/create-order', [PaypalController::class, 'createOrder']);
    Route::post('/paypal/success', [MyPaymentController::class, 'success'])->name('paypal.success');
    Route::get('/paypal/cancel', [MyPaymentController::class, 'cancel'])->name('paypal.cancel');

    Route::get('/order and payment', [MyPaymentController::class, 'index']);
})

?>