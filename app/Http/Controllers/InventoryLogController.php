<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\InventoryLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryLogController extends Controller
{
    public function index()
    {
         $logs = InventoryLog::with('inventoryItem')
            ->latest()
            ->paginate(20);

        return Inertia::render('InventoryLog/Index', [
            'logs' => $logs,
        ]);

    }

    //  public function showByItem($inventoryItemId)
    // {
    //     $logs = InventoryLog::with('inventoryItem')
    //         ->where('inventory_item_id', $inventoryItemId)
    //         ->latest()
    //         ->paginate(20);

    //     return Inertia::render('Inventory/Logs/Index', [
    //         'logs' => $logs,
    //     ]);
    // }
}
