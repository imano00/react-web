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
}
