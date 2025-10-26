<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Drink;
use Illuminate\Http\Request;

class DrinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $drinks = Drink::all();
        return inertia('Drinks/Index', ['drinks' => $drinks]);
        // below code are used to test retrieval data without front end
        // return response()->json($drinks);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Drinks/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
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
        $drink = Drink::findOrFail($id);

        $request->validate([
            'name' => 'required',
            'category' => 'required',
            'price' => 'required',
            'description' => 'nullable',
        ]);

        $drink->update($request->all());

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
