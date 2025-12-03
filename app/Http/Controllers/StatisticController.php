<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class StatisticController extends Controller
{
     public function index()
    {
        $today = Carbon::today();
        $startOfWeek = Carbon::now()->startOfWeek();
        $startOfMonth = Carbon::now()->startOfMonth();

        return Inertia::render('Statistic/Index', [
            'stats' => [
                'today_sales' => Sale::whereDate('created_at', $today)->sum('total'),
                'week_sales' => Sale::whereBetween('created_at', [$startOfWeek, now()])->sum('total'),
                'month_sales' => Sale::whereBetween('created_at', [$startOfMonth, now()])->sum('total'),
                'total_transactions' => Sale::count(),
                'average_transaction' => round(Sale::avg('total'), 2),
            ],
        ]);
    }
    
        /**
     * Fetches hourly sales data for the chart component (API endpoint).
     */
    public function getYesterdaySalesData()
    {
        $yesterday = Carbon::yesterday();
        $startOfDay = $yesterday->copy()->startOfDay();
        $endOfDay = $yesterday->copy()->endOfDay();

        // Get sales grouped by hour
        $rawData = DB::table('sales')
            ->select(
                DB::raw('HOUR(created_at) as hour'),
                DB::raw('SUM(total) as sales')
            )
            ->whereBetween('created_at', [$startOfDay, $endOfDay])
            ->groupBy('hour')
            ->orderBy('hour', 'asc')
            ->get()
            ->pluck('sales', 'hour') // key = hour, value = sales
            ->toArray();

        // Build full 24-hour dataset (00:00 → 23:00)
        $chartData = [];

        for ($h = 0; $h < 24; $h++) {
            $chartData[] = [
                'time' => sprintf('%02d:00', $h),
                'sales' => isset($rawData[$h]) ? (float) $rawData[$h] : 0,
            ];
        }

        return response()->json($chartData);
    }

        public function getMonthlySalesData()
    {
        $start = now()->startOfMonth();
        $end   = now()->endOfMonth();

        // Get raw summed sales by day
        $rawData = DB::table('sales')
            ->select(
                DB::raw('DAY(created_at) as day'),
                DB::raw('SUM(total) as sales')
            )
            ->whereBetween('created_at', [$start, $end])
            ->groupBy('day')
            ->orderBy('day', 'asc')
            ->get()
            ->pluck('sales', 'day')
            ->toArray();

        // Build a full dataset for the whole month
        $daysInMonth = now()->daysInMonth;
        $chartData = [];

        for ($d = 1; $d <= $daysInMonth; $d++) {
            $chartData[] = [
                'day' => $d,
                'sales' => isset($rawData[$d]) ? (float) $rawData[$d] : 0,
            ];
        }

        return response()->json($chartData);
    }
}

