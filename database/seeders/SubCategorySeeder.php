<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\SubCategory;

class SubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ingredients = Category::firstOrCreate(['name' => 'Ingredients']);
        $nonIngredients = Category::firstOrCreate(['name' => 'Non-Ingredients']);


        SubCategory::insert([
            // Ingredients
            ['name' => 'Coffee Beans', 'category_id' => $ingredients->id, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Milk', 'category_id' => $ingredients->id, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Syrups', 'category_id' => $ingredients->id, 'created_at' => now(), 'updated_at' => now()],

            // Non-Ingredients
            ['name' => 'Packaging', 'category_id' => $nonIngredients->id, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Cups & Lids', 'category_id' => $nonIngredients->id, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Cleaning Supplies', 'category_id' => $nonIngredients->id, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
