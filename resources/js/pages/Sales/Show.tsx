import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Sale {
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
    const total = sale.total.toFixed(2);
    const paid = sale.paid.toFixed(2);
    const change = sale.change.toFixed(2);

    return (
        <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">🧾 Sale Receipt</h2>
                <Link href={route('sales.index')}>
                    <Button variant="outline">Back</Button>
                </Link>
            </div>

            <div className="mb-6 border-b pb-4">
                <p>
                    <strong>Invoice:</strong> {sale.invoice_number}
                </p>
                <p>
                    <strong>Date:</strong> {new Date(sale.created_at).toLocaleString()}
                </p>
                <p>
                    <strong>Cashier:</strong> {sale.user?.name ?? 'N/A'}
                </p>
            </div>

            <h3 className="mb-2 text-lg font-semibold">Items</h3>
            <table className="mb-4 w-full border-collapse text-left">
                <thead>
                    <tr className="border-b">
                        <th className="py-2">#</th>
                        <th className="py-2">Item</th>
                        <th className="py-2 text-right">Qty</th>
                        <th className="py-2 text-right">Price</th>
                        <th className="py-2 text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {sale.items.map((item, index) => (
                        <tr key={item.id} className="border-b">
                            <td className="py-2">{index + 1}</td>
                            <td className="py-2">{item.drink?.name}</td>
                            <td className="py-2 text-right">{item.quantity}</td>
                            <td className="py-2 text-right">RM {item.price.toFixed(2)}</td>
                            <td className="py-2 text-right">RM {(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-semibold">RM {total}</span>
                </div>
                <div className="flex justify-between">
                    <span>Paid:</span>
                    <span>RM {paid}</span>
                </div>
                <div className="flex justify-between font-semibold text-green-600">
                    <span>Change:</span>
                    <span>RM {change}</span>
                </div>
            </div>

            <div className="mt-6 text-center">
                <Button variant="secondary" onClick={() => window.print()} className="w-full">
                    🖨 Print Receipt
                </Button>
            </div>
        </div>
    );
}
