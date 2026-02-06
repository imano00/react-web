<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Drink;
use App\Models\Subcategory;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DrinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
       return Inertia::render('Drinks/Index', [
        'drinks' => Drink::with('subcategory.category')->get(),
        'categories' => Category::with('subcategories')->get(),
    ]);
        // below code are used to test retrieval data without front end
        // return response()->json($drinks);
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         return Inertia::render('Drinks/Create', [
            'categories' => Category::with('subcategories')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subcategory_id' => 'required|exists:subcategories,id',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        Drink::create($validated);

        return redirect()->route('drinks.index')->with('success', 'Drink created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $drink = Drink::with('subcategory.category.subcategories')->findOrFail($id);

        // Validation
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subcategory_id' => 'required|exists:subcategories,id',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

         // 2️⃣ OPTIONAL SAFETY CHECK (this is the part you asked about 💕)
        $subcategory = Subcategory::where('id', $validated['subcategory_id'])
        ->whereHas('category', function ($q) {
            $q->where('name', 'drinks');
        })
        ->firstOrFail();

        // 3️⃣ Update using the verified subcategory
        $drink->update([
            'name' => $validated['name'],
            'subcategory_id' => $subcategory->id,
            'price' => $validated['price'],
            'description' => $validated['description'] ?? null,
        ]);

        return redirect()->route('drinks.index')->with('success', 'Drink updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $drink = Drink::findOrFail($id);
        $drink->delete();

        return redirect()->back()->with('success', 'Drink deleted successfully!');
    }
}
