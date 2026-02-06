<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DrinkController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\StatisticController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
                                   
    Route::resource('drinks', DrinkController::class);

    Route::get('/drinks', [DrinkController::class, 'index'])->name('drinks.index');

    // Route::get('/drinks/create', [DrinkController::class, 'create'])->name('drinks.create');

    Route::put('/drinks/{id}', [DrinkController::class, 'update'])->name('drinks.update');

    Route::delete('/drinks/{id}', [DrinkController::class, 'destroy'])->name('drinks.destroy');

    Route::resource('sales', SaleController::class);

    Route::get('/sales', [SaleController::class, 'index'])->name('sales.index');

    Route::get('/sales/create', [SaleController::class, 'create'])->name('sales.create');

    Route::get('/statistics', [StatisticController::class, 'index'])->name('statistics.index');

    Route::get('/inventory', [InventoryController::class, 'index'])->name('inventory.index');

    Route::get('/inventory/create', [InventoryController::class, 'create'])->name('inventory.create');

    Route::post('/inventory', [InventoryController::class, 'store'])->name('inventory.store');

    Route::put('/inventory/{id}', [InventoryController::class, 'update'])->name('inventory.update');
    
    //Route::get('/sales/{id}', [SaleController::class, 'show'])->name('sales.show');

    // Route::post('/orders', [OrderController::class, 'store']);

    // Route::apiResource('orders', OrderController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
