import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ItemForm } from './item-form';

type Subcategory = {
    id: number;
    name: string;
    category: { id: number; name: string };
};

type Category = {
    id: number;
    name: string;
    subcategories: Subcategory[];
};

export default function AddInventoryItemDialog({ categories = [] }: { categories: Category[] }) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, reset, processing, errors } = useForm({
        name: '',
        subcategory_id: undefined as number | undefined,
        category_id: undefined as number | undefined,
        unit: '',
        current_stock: 0,
        reorder_level: 0,
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('inventory.store'), {
            onSuccess: () => {
                toast.success('New inventory item added!');
                setOpen(false);
                reset();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ Add New Item</Button>
            </DialogTrigger>

            <DialogContent className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Inventory Item</DialogTitle>
                        <DialogDescription className="my-2">Add a new inventory item to your inventory list.</DialogDescription>
                    </DialogHeader>

                    <ItemForm data={data} setData={setData} categories={categories} mode="create" />
                </form>
            </DialogContent>
        </Dialog>
    );
}
