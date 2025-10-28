import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Printer } from 'lucide-react';

interface Sale {
    id: number;
    total: number;
    paid: number;
    change: number;
    invoice_number: string;
    created_at: string;
    user?: { name: string };
    items: {
        id: number;
        drink?: { name: string };
        quantity: number;
        price: number;
    }[];
}

export default function Show({ sale }: { sale: Sale }) {
    const total = Number(sale?.total ?? 0).toFixed(2);
    const paid = Number(sale?.paid ?? 0).toFixed(2);
    const change = Number(sale?.change ?? 0).toFixed(2);

    const { props } = usePage();
    const flash = props.flash as { success?: string };

    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Sales', href: '/sales' },
        { title: sale.invoice_number, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-1/2 flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-semibold">🧾 Sale Receipt</h2>
                    </div>
                    <Link href={route('sales.index')}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                </div>

                {/* Flash Success Message */}
                {flash?.success && (
                    <Alert className="mb-4 border-green-400 bg-green-50 text-green-700">
                        <CheckCircle2 className="h-5 w-5" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                {/* Sale Summary */}
                <Card className="border-muted border shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Sale Information</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground space-y-1 text-sm">
                        <p>
                            <strong className="text-foreground">Invoice:</strong> {sale.invoice_number}
                        </p>
                        <p>
                            <strong className="text-foreground">Date:</strong> {new Date(sale.created_at).toLocaleString()}
                        </p>
                        <p>
                            <strong className="text-foreground">Cashier:</strong> {sale.user?.name ?? 'N/A'}
                        </p>
                    </CardContent>
                </Card>

                {/* Items Table */}
                <Card className="border-muted border shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Item</TableHead>
                                    <TableHead className="text-right">Qty</TableHead>
                                    <TableHead className="text-right">Price (RM)</TableHead>
                                    <TableHead className="text-right">Total (RM)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sale?.items && sale.items.length > 0 ? (
                                    sale.items.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.drink?.name ?? 'Unknown'}</TableCell>
                                            <TableCell className="text-right">{item.quantity}</TableCell>
                                            <TableCell className="text-right">{Number(item.price).toFixed(2)}</TableCell>
                                            <TableCell className="text-right">{(Number(item.price) * item.quantity).toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-muted-foreground text-center">
                                            No items found for this sale 😢
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Totals Section */}
                <Card className="border-muted border shadow-sm">
                    <CardContent className="pt-4">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Total:</span>
                                <span className="text-foreground font-medium">RM {total}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Paid:</span>
                                <span>RM {paid}</span>
                            </div>

                            <Separator className="my-2" />

                            <div className="flex justify-between font-semibold text-green-600">
                                <span>Change:</span>
                                <span>RM {change}</span>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button variant="secondary" onClick={() => window.print()} className="flex w-full items-center justify-center gap-2">
                            <Printer className="h-4 w-4" />
                            Print Receipt
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
