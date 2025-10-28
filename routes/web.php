<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DrinkController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('tasks', function () {
        return Inertia::render('Tasks/index');
    })->name('tasks.index');
                                   
    Route::resource('drinks', DrinkController::class);

    Route::get('/drinks', [DrinkController::class, 'index'])->name('drinks.index');

    Route::put('/drinks/{id}', [DrinkController::class, 'update'])->name('drinks.update');

    Route::delete('/drinks/{id}', [DrinkController::class, 'destroy'])->name('drinks.destroy');

    // Route::post('/orders', [OrderController::class, 'store']);

    // Route::apiResource('orders', OrderController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
