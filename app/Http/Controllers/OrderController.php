<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Get all orders
    public function index()
    {
        return response()->json(Order::all());
    }

    // Create new order
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'problem' => 'required|string',
            'service_type' => 'required|string',
            'quoted_price' => 'nullable|numeric',
            'technician_id' => 'nullable|integer|exists:users,id',
            'admin_notes' => 'nullable|string',
        ]);

        $order = Order::create($validated);

        return response()->json([
            'message' => 'Order created successfully 🎉',
            'order' => $order
        ], 201);
    }

    // Get specific order
    public function show($id)
    {
        $order = Order::findOrFail($id);
        return response()->json($order);
    }

    // Update order
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'customer_name' => 'sometimes|required|string|max:255',
            'phone' => 'sometimes|required|string|max:20',
            'address' => 'sometimes|required|string',
            'problem' => 'sometimes|required|string',
            'service_type' => 'sometimes|required|string',
            'quoted_price' => 'nullable|numeric',
            'technician_id' => 'nullable|integer|exists:users,id',
            'admin_notes' => 'nullable|string',
        ]);

        $order->update($validated);

        return response()->json([
            'message' => 'Order updated 💪',
            'order' => $order
        ]);
    }

    // Delete order
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json(['message' => 'Order deleted 💀']);
    }
}
