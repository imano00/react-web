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
  Schema::create('products', function (Blueprint $table) {
            $table->id();

            // 🧾 Basic Info
            $table->string('name');
            $table->string('sku')->nullable()->unique();
            $table->string('barcode')->nullable()->unique();

            // 💰 Pricing
            $table->decimal('price', 10, 2);
            $table->decimal('cost', 10, 2)->nullable();

            // 📦 Inventory
            $table->integer('stock')->default(0);

            // 📂 Category
            $table->foreignId('category_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            // 🖼️ Media
            $table->string('image_url')->nullable();

            // 📝 Extra
            $table->text('description')->nullable();

            // 🔄 Status
            $table->boolean('is_active')->default(true);

            $table->timestamps();

            // ⚡ Performance (you’ll thank me later)
            $table->index('name');
            $table->index('price');
            $table->index('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
