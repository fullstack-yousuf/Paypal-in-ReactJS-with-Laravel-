<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('my_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('custom_orders_id')->constrained()->onDelete('cascade');
            $table->string('payment_method');
            $table->string('amopayment_status')->default('pending');
            $table->string('transaction_id')->nullable();
            $table->decimal('amount',5,2)->nullable();
            $table->json('payment_data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('my_payments');
    }
};
