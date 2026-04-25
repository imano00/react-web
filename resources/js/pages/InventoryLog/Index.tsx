import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory Logs',
        href: '/inventorylog',
    },
];

type InventoryLog = {
    id: number;
    type: 'IN' | 'OUT' | 'ADJUSTMENT';
    quantity: number;
    previous_quantity: number;
    new_quantity: number;
    note?: string;
    created_at: string;
    created_by?: { name: string };
    inventory_item: {
        id: number;
        name: string;
    };
};

type InventoryLogPageProps = {
    inventoryLogs: InventoryLog[];
};

export default function Index({ inventoryLogs }: InventoryLogPageProps) {
    console.log('huehue:', inventoryLogs);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory Logs" />
            <div className="space-y-6 p-6">
                <h2 className="text-xl font-semibold">Inventory Movement Logs</h2>
                {/* ✨ Filter by Category */}
                <div className="flex flex-row items-center">
                    {/* <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="Coffee">Coffee</SelectItem>
                                <SelectItem value="Soda">Soda</SelectItem>
                                <SelectItem value="Chocolate">Chocolate</SelectItem>
                                <SelectItem value="Matcha">Matcha</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select> */}
                    {/* <SearchBar value={search} onChange={setSearch} placeholder="Search drinks" className="mx-2 w-full" /> */}
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Item</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Previous</TableHead>
                            <TableHead>New</TableHead>
                            <TableHead>Note</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {inventoryLogs !== undefined ? (
                            inventoryLogs.map((inventorylog) => (
                                <TableRow key={inventorylog.id}>
                                    <TableCell>{new Date(inventorylog.created_at).toLocaleString()}</TableCell>

                                    <TableCell className="font-medium">{inventorylog.inventory_item?.name}</TableCell>

                                    <TableCell>
                                        {inventorylog.type === 'IN' && <span className="font-medium text-green-600">IN</span>}
                                        {inventorylog.type === 'OUT' && <span className="font-medium text-red-600">OUT</span>}
                                        {inventorylog.type === 'ADJUSTMENT' && <span className="font-medium text-yellow-600">ADJUSTMENT</span>}
                                    </TableCell>

                                    <TableCell>{inventorylog.quantity}</TableCell>
                                    <TableCell>{inventorylog.previous_quantity}</TableCell>
                                    <TableCell>{inventorylog.new_quantity}</TableCell>
                                    <TableCell>{inventorylog.note ?? '-'}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No inventory logs found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
