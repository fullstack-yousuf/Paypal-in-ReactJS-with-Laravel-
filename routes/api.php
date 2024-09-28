<?php


use App\Http\Controllers\CustomOrderController;
use App\Http\Controllers\MyPaymentController;

Route::middleware('auth:sanctum')->group(function (Request $request) {
    Route::post('/orders', [CustomOrderController::class, 'create']);
    Route::post('/payments', [MyPaymentController::class, 'create']);
    Route::get('/order and payment', [MyPaymentController::class, 'index']);
})

?>