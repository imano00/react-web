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
Schema::create('order_items', function (Blueprint $table) {
    $table->id();

    // Relationships
    $table->foreignId('order_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->foreignId('product_id')
        ->constrained()
        ->restrictOnDelete();

    // Snapshot data (VERY IMPORTANT 😌)
    $table->string('product_name');
    $table->decimal('price', 10, 2);
    $table->integer('quantity');

    // Optional future
    $table->decimal('total', 10, 2);

    $table->timestamps();

    // 🔥 Indexes
    $table->index('order_id');
    $table->index('product_id');
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
