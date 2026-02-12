import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DrinkForm } from './drink-form';

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

export default function AddDrinkDialog({ categories }: { categories: Category[] }) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, reset } = useForm({
        name: '',
        subcategory_id: undefined as number | undefined,
        category_id: undefined as number | undefined,
        price: 0,
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('drinks.store'), {
            onSuccess: () => {
                toast.success('New drink added! 🧋');
                setOpen(false); // close dialog
                reset(); // clear form
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ Add New Drink</Button>
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Drink 🧋</DialogTitle>
                        <DialogDescription className="my-2">Add a new drink item to your menu.</DialogDescription>
                    </DialogHeader>

                    <DrinkForm data={data} setData={setData} categories={categories} mode="create" />
                </form>
            </DialogContent>
        </Dialog>
    );
}
