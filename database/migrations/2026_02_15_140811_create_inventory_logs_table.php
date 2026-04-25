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
    Schema::create('inventory_logs', function (Blueprint $table) {
        $table->id();

        $table->foreignId('inventory_item_id')
            ->constrained('inventory_items')
            ->cascadeOnDelete();

        $table->enum('type', ['IN', 'OUT', 'ADJUSTMENT']);

        $table->integer('quantity'); 
        $table->integer('previous_quantity');
        $table->integer('new_quantity');

        $table->text('note')->nullable();

        $table->foreignId('created_by')
            ->nullable()
            ->constrained('users')
            ->nullOnDelete();

        $table->timestamps();

        $table->index(['inventory_item_id', 'created_at']);
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_logs');
    }
};
