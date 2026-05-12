<?php

// app/Http/Controllers/Customer/ShoppingController.php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Inertia\Inertia;
use App\Http\Resources\ProductResource;

class ShoppingController extends Controller
{

// Loads React page
public function index()
{
    return Inertia::render('Shopping/Index', [
        'products' => Product::all()
    ]);
}
    // 📦 1. Get Products (for customer page)
public function products(Request $request)
{
    $query = Product::query()
        ->where('is_active', true)
        ->with('category');

    // 🔍 Search (name / barcode / sku)
    if ($request->filled('search')) {
        $search = $request->search;

        $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('barcode', 'like', "%{$search}%")
              ->orWhere('sku', 'like', "%{$search}%");
        });
    }

    // 📂 Filter by category
    if ($request->filled('category_id')) {
        $query->where('category_id', $request->category_id);
    }

    // 📊 Sorting
    $allowedSorts = ['name', 'price', 'latest'];

$sort = in_array($request->get('sort'), $allowedSorts)
    ? $request->get('sort')
    : 'name';

    if ($sort === 'price') {
        $query->orderBy('price');
    } elseif ($sort === 'latest') {
        $query->latest();
    } else {
        $query->orderBy('name');
    }

    $products = $query->get()->map(function ($product) {
        return new ProductResource($product);
    });

    // return response()->json($products);
    return $products;
}



public function show(Product $product)
{
        $product->load([
        'category',
        'images'
    ]);

    return Inertia::render('Shopping/Detail', [
        'product' => new ProductResource($product)
    ]);
}

    // 🛒 2. Get Cart (session-based)
    public function cart()
    {
        return response()->json(session()->get('cart', []));
    }

    // ➕ 3. Add to Cart
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'nullable|integer|min:1'
        ]);

        $product = Product::findOrFail($request->product_id);
        $qty = $request->quantity ?? 1;

        $cart = session()->get('cart', []);

        if (isset($cart[$product->id])) {
            $cart[$product->id]['quantity'] += $qty;
        } else {
            $cart[$product->id] = [
                'product_id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $qty,
            ];
        }

        session()->put('cart', $cart);

        return response()->json([
            'message' => 'Added to cart',
            'cart' => $cart
        ]);
    }

    // ➖ 4. Remove from Cart
    public function removeFromCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required'
        ]);

        $cart = session()->get('cart', []);

        unset($cart[$request->product_id]);

        session()->put('cart', $cart);

        return response()->json($cart);
    }

    // 🔄 5. Update Quantity (important upgrade 😏)
    public function updateCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = session()->get('cart', []);

        if (isset($cart[$request->product_id])) {
            $cart[$request->product_id]['quantity'] = $request->quantity;
        }

        session()->put('cart', $cart);

        return response()->json($cart);
    }

    // 💳 6. Checkout → Create Order
    public function checkout(Request $request)
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        // 🧮 calculate total
        $total = collect($cart)->sum(function ($item) {
            return $item['price'] * $item['quantity'];
        });

        // 🧾 create order
        $order = Order::create([
            'customer_name' => $request->customer_name ?? 'Guest',
            'total_amount' => $total,
            'status' => 'pending',
        ]);

        // 📦 create order items
        foreach ($cart as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'product_name' => $item['name'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        // 🧹 clear cart
        session()->forget('cart');

        return response()->json([
            'message' => 'Order created',
            'order_id' => $order->id
        ]);
    }
}