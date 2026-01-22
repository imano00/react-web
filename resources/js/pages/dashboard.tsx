import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import MonthlySalesChart from './charts/MonthlySalesChart';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: '#2563eb',
    },
    mobile: {
        label: 'Mobile',
        color: '#60a5fa',
    },
} satisfies ChartConfig;

export default function Dashboard() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    React.useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card className="align-center">
                        <CardHeader>
                            <CardTitle>Date</CardTitle>
                            <CardDescription>
                                {date?.toLocaleDateString()} {date?.getHours()}
                                {':'}
                                {date?.getMinutes().toString().padStart(2, '0')}
                                {':'}
                                {date?.getSeconds().toString().padStart(2, '0')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="w-200px">
                            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-lg border" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales Overview</CardTitle>
                            <CardDescription>Sales data for desktop and mobile users.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                            <ChartContainer config={chartConfig} className="h-full min-h-[200px] w-full">
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent payload="huehue" />} />
                                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Placeholder Patterns</CardTitle>
                            <CardDescription>Using SVG patterns as placeholders for loading states.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                            <PlaceholderPattern className="inset-0 stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardContent className="p-2">
                        <MonthlySalesChart />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
