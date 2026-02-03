<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\InventoryItem;
use App\Models\Category;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        $inventoryItems = InventoryItem::with('subcategory')->get(); // Fetch inventory items from the database        
        return inertia('Inventory/Index', [
            'initialItems' => $inventoryItems,            
        ]);
    }

    public function update(Request $request, $id)
    {
        $item = InventoryItem::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'subcategory_id' => 'required|exists:subcategories,id',
            'unit' => 'required|string|max:50',
            'current_stock' => 'required|numeric|min:0',
            'reorder_level' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $item->update($validatedData);

        return redirect()->route('inventory.index')->with('success', 'Inventory item updated successfully.');
    }

    public function create()
    {
        // Eager load subcategories
        $categories = Category::with('subcategories')->get();

        return inertia('Inventory/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'subcategory_id' => 'required|exists:subcategories,id',
            'unit' => 'required|string|max:50',
            'current_stock' => 'required|numeric|min:0',
            'reorder_level' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        InventoryItem::create($data);

        return redirect()->route('inventory.index')->with('success', 'Inventory item added.');
}
}
