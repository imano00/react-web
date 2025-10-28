import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sales',
        href: '/sales',
    },
];

type Sale = {
    id: number;
    invoice_number: string;
    total: number;
    paid: number;
    change: number;
    created_at: string;
    user?: { name: string };
};

export default function Index({ sales }: { sales: Sale[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales History" />
            <div className="flex h-1/2 flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="border-muted border shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-2xl font-semibold">📊 Sales Record</CardTitle>
                        <Link href={route('sales.create')}>
                            <Button>New Sale</Button>
                        </Link>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Invoice</TableHead>
                                    <TableHead>Cashier</TableHead>
                                    <TableHead className="text-right">Total (RM)</TableHead>
                                    <TableHead className="text-right">Date</TableHead>
                                    <TableHead className="text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {sales.length > 0 ? (
                                    sales.map((sale, index) => (
                                        <TableRow key={sale.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="font-medium">{sale.invoice_number}</TableCell>
                                            <TableCell>{sale.user?.name ?? 'N/A'}</TableCell>
                                            <TableCell className="text-right">{Number(sale.total).toFixed(2)}</TableCell>
                                            <TableCell className="text-right">{new Date(sale.created_at).toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Link href={route('sales.show', sale.id)}>
                                                    <Button variant="outline" size="sm" className="mx-auto flex items-center gap-1">
                                                        View <ArrowRight className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-muted-foreground text-center">
                                            No sales recorded yet 💤
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
