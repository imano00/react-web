<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\InventoryItem;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        $inventoryItems = InventoryItem::all(); // Fetch inventory items from the database
        return inertia('Inventory/Index', [
            'initialItems' => $inventoryItems
        ]);
    }

    public function update(Request $request, $id)
    {
        $item = InventoryItem::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'current_stock' => 'required|numeric|min:0',
            'reorder_level' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $item->update($validatedData);

        return redirect()->route('inventory.index')->with('success', 'Inventory item updated successfully.');
    }
}
