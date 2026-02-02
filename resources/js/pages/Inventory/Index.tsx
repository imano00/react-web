import AddInventoryItemDialog from '@/components/custom-component/add-inventory-item-dialog';
import { ItemList } from '@/components/custom-component/item-list';
import SearchBar from '@/components/custom-component/search-bar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: '/inventory',
    },
];

type Category = {
    id: number;
    name: string;
    subcategories: { id: number; name: string }[];
};
type InventoryItem = {
    id: number;
    name: string;
    subcategory_id: number;
    unit: string;
    quantity: number;
    reorder_level: number;
};

export default function Index({ initialItems, categories }: { initialItems: InventoryItem[]; categories: Category[] }) {
    const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
    const [items, setItems] = useState<InventoryItem[]>(initialItems);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [open, setOpen] = useState(false);
    const [onOpenChange, setOnOpenChange] = useState<(open: boolean) => void>();

    const handleEdit = (item: InventoryItem) => {
        setEditingItem(item);
    };

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const filteredItems = items.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory" />
            <div className="space-y-6 p-6">
                <h1 className="text-3xl font-semibold">Inventory</h1>

                {/* Search & Add */}
                <div className="flex items-center gap-4">
                    <SearchBar placeholder="Search item" value={search} onChange={setSearch} className="w-full" />
                    <AddInventoryItemDialog categories={categories ?? []} open={open} onOpenChange={setOpen} />
                </div>

                {/* Inventory List */}
                <ItemList items={filteredItems} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </AppLayout>
    );
}
