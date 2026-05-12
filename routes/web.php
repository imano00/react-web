<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DrinkController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\StatisticController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InventoryLogController;
use App\Http\Controllers\ShoppingController;
use App\Http\Controllers\OrderController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
                                   
    // Drinks Controller
    Route::resource('drinks', DrinkController::class);

    Route::get('/drinks', [DrinkController::class, 'index'])->name('drinks.index');

    // Route::get('/drinks/create', [DrinkController::class, 'create'])->name('drinks.create');

    Route::put('/drinks/{id}', [DrinkController::class, 'update'])->name('drinks.update');

    Route::delete('/drinks/{id}', [DrinkController::class, 'destroy'])->name('drinks.destroy');

    // Sales Controller
    Route::resource('sales', SaleController::class);

    Route::get('/sales', [SaleController::class, 'index'])->name('sales.index');

    Route::get('/sales/create', [SaleController::class, 'create'])->name('sales.create');

    // Stastics Controller
    Route::get('/statistics', [StatisticController::class, 'index'])->name('statistics.index');

    // Inventory Controller
    Route::get('/inventory', [InventoryController::class, 'index'])->name('inventory.index');

    Route::get('/inventory/create', [InventoryController::class, 'create'])->name('inventory.create');

    Route::post('/inventory', [InventoryController::class, 'store'])->name('inventory.store');

    Route::put('/inventory/{id}', [InventoryController::class, 'update'])->name('inventory.update');
    
    //Route::get('/sales/{id}', [SaleController::class, 'show'])->name('sales.show');

    // InventoryLog Controller
    Route::get('/inventorylog', [InventoryLogController::class, 'index'])->name('inventorylog.index');

    // Route::get('/inventory/{inventoryItemId}/logs', [InventoryLogController::class, 'showByItem'])->name('inventory.item.logs');

    // Route::get('/products', [ShoppingController::class, 'products']);
    // Shopping Controller
    Route::prefix('customer')->group(function () {
        Route::get('/shopping', [ShoppingController::class, 'index'])->name('shopping.index');
        Route::get('/products', [ShoppingController::class, 'products'])->name('shopping.products');
        Route::get('/product/{product}', [ShoppingController::class, 'show'])->name('shopping.show');

        Route::get('/cart', [ShoppingController::class, 'cart']);
        Route::post('/cart/add', [ShoppingController::class, 'addToCart']);
        Route::post('/cart/remove', [ShoppingController::class, 'removeFromCart']);
        Route::post('/cart/update', [ShoppingController::class, 'updateCart']);
        Route::post('/checkout', [ShoppingController::class, 'checkout']);
    });
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
