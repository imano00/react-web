import AddInventoryItemDialog from '@/components/custom-component/add-inventory-item-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: '/inventory',
    },
];
export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory" />
            <div className="space-y-6 p-6">
                <h1 className="text-3xl font-semibold">Inventory</h1>

                {/* Search & Add */}
                <div className="flex items-center gap-4">
                    <div className="flex w-full items-center rounded-2xl border px-4 py-2 shadow-sm">
                        <Search className="h-5 w-5 opacity-60" />
                        <input type="text" placeholder="Search ingredients..." className="ml-3 w-full bg-transparent outline-none" />
                    </div>
                    <AddInventoryItemDialog />
                </div>

                {/* Inventory List */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Example Item */}
                    <Card className="rounded-2xl shadow-md">
                        <CardContent className="space-y-2 p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-medium">Coffee Beans</h2>
                                <span>
                                    <Badge className="h-7 min-w-7 rounded-full px-2 font-mono tabular-nums">8</Badge>
                                </span>
                            </div>
                            <p className="text-sm opacity-70">Current Stock: 1200g</p>
                            <p className="text-sm opacity-70">Reorder Level: 500g</p>
                            <Button className="mt-2 w-full rounded-2xl">View Details</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
