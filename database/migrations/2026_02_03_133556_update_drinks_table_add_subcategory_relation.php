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
        Schema::table('drinks', function(Blueprint $table){
            $table->dropColumn('category');
        });

        Schema::table('drinks', function(Blueprint $table){
            // Add new foreign key column for subcategory relation
            $table->foreignId('subcategory_id')->after('name')->constrained('subcategories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('drinks', function(Blueprint $table){
            $table->string('category')->after('name');
            $table->dropForeign(['subcategory_id']);
            $table->dropColumn('subcategory_id');
        });
    }
};
