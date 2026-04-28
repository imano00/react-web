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
Schema::create('orders', function (Blueprint $table) {
    $table->id();

    // Customer info
    $table->string('customer_name')->nullable();

    // Financial
    $table->decimal('subtotal', 10, 2)->default(0);
    $table->decimal('discount', 10, 2)->default(0);
    $table->decimal('tax', 10, 2)->default(0);
    $table->decimal('total_amount', 10, 2);

    // Status & flow
    $table->string('status')->default('pending'); 
    // pending, paid, cancelled, completed

    // Optional future-proofing
    $table->string('order_type')->default('customer'); 
    // customer, pos

    $table->string('payment_status')->default('unpaid'); 
    // unpaid, paid, failed

    $table->timestamp('paid_at')->nullable();

    $table->timestamps();

    // 🔥 Indexes (important)
    $table->index('status');
    $table->index('payment_status');
    $table->index('created_at');
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
