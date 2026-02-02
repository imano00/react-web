<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\InventoryItem;
use App\Models\SubCategory;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $mapping = [
        'ingredients' => 'Coffee Beans',   // adjust to match your old data
        'non-ingredients' => 'Packaging',
    ];

    foreach ($mapping as $oldCategory => $subName) {
        $subcategory = SubCategory::where('name', $subName)->first();

        if ($subcategory) {
            InventoryItem::where('category', $oldCategory)
                ->update(['subcategory_id' => $subcategory->id]);
        }
    }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subcategories', function (Blueprint $table) {
            //
        });
    }
};
