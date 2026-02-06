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
        DB::table('subcategories')->insert([
            ['name' => 'coffee', 'category_id' => 3],
            ['name' => 'soda', 'category_id' => 3],
            ['name' => 'matcha', 'category_id' => 3],
            ['name' => 'chocolate', 'category_id' => 3],            
        ]);
        
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('subcategories')->whereIn('name', ['coffee', 'soda', 'matcha', 'chocolate'])->delete();
    }
};
