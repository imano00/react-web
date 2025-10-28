<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleController extends Controller
{
        public function index()
    {
         $sales = Sale::with('items.drink')->latest()->get();
        return inertia('Sales/Index', ['sales' => $sales]);
        // below code are used to test retrieval data without front end
        // return response()->json($drinks);
    }

    public function create()
{
    $drinks = \App\Models\Drink::all();
        return inertia('Sales/Create', [
            'drinks' => $drinks,
        ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'items' => 'required|array|min:1',
        'items.*.drink_id' => 'required|exists:drinks,id',
        'items.*.quantity' => 'required|integer|min:1',
        'items.*.price' => 'required|numeric|min:0',
        'paid' => 'required|numeric|min:0',
    ]);

    // Calculate total from the items
    $total = collect($validated['items'])->sum(fn($item) => $item['price'] * $item['quantity']);

    $transaction = Sale::create([
        'invoice_number' => 'INV-' . now()->format('YmdHis'),
        'user_id' => auth()->id(),
        'total' => $total,
        'paid' => $validated['paid'],
        'change' => $validated['paid'] - $total,
    ]);

    foreach ($validated['items'] as $item) {
        $transaction->items()->create($item);
    }

    return response()->json([
        'message' => 'Transaction created successfully!',
        'data' => $transaction->load('items'),
    ]);
}

public function show(Sale $sale)
    {
        $sale->load('items.drink', 'user');
        return inertia('Sales/Show', [
            'sale' => $sale,
        ]);
    }

    public function destroy(Sale $sale)
    {
        $sale->delete();
        return back()->with('success', 'Sale deleted successfully.');
    }

}
