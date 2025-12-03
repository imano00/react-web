<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StatisticController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| This file is where you define all your API routes for your application.
| These routes are loaded by the RouteServiceProvider and assigned to
| the "api" middleware group.
|
*/

// Route::get('/hello-laravel', function() {
//     return response()->json(['message' => 'Laravel sees me! 💕']);
// });

// Example protected route if you’re using Laravel Sanctum or auth
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Public or simple API routes

    Route::get('/dashboard', [DashboardController::class, 'index']);

});

    Route::get('/sales/yesterday', [StatisticController::class, 'getYesterdaySalesData']);
    Route::get('/monthly-sales', [StatisticController::class, 'getMonthlySalesData']);
    // Route::get('/stats/yesterday-sales', [DashboardController::class, 'getYesterdaySales']);


