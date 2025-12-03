import YesterdaySalesChart from '@/pages/charts/YesterdaySalesChart';

import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import MonthlySalesChart from '../charts/MonthlySalesChart';

interface Stats {
    today_sales: number;
    week_sales: number;
    month_sales: number;
    total_transactions: number;
    average_transaction: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Statistics',
        href: '/statistics',
    },
];

export default function Statistic({ stats }: { stats: Stats }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Drink" />
            <div className="space-y-6 p-6">
                <h1 className="mb-4 text-2xl font-bold">Sales Overview</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-500">Today’s Sales</p>
                            <h2 className="text-2xl font-semibold">RM {stats.today_sales}</h2>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-500">This Week</p>
                            <h2 className="text-2xl font-semibold">RM {stats.week_sales}</h2>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-500">This Month</p>
                            <h2 className="text-2xl font-semibold">RM {stats.month_sales}</h2>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-500">Total Transactions</p>
                            <h2 className="text-2xl font-semibold">{stats.total_transactions}</h2>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-500">Average Transaction</p>
                            <h2 className="text-2xl font-semibold">RM {stats.average_transaction}</h2>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                        <CardContent className="p-4">
                            <YesterdaySalesChart />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <MonthlySalesChart />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
