import { Textarea } from '@/components/textarea';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Pen, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Drink {
    id: number;
    name: string;
    category: string;
    price: number;
    description?: string;
}

export default function Index({ drinks }: { drinks: Drink[] }) {
    const [editingDrink, setEditingDrink] = useState<null | number>(null);
    const [deleteDrink, setDeleteDrink] = useState<null | number>(null);
    const [open, setOpen] = useState(false);
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
        put,
        delete: destroy,
    } = useForm({
        name: '',
        category: '',
        price: 0,
        description: '',
    });

    const startEdit = (drink: Drink) => {
        setEditingDrink(drink.id);
        setData({
            name: drink.name,
            category: drink.category,
            price: drink.price,
            description: drink.description || '',
        });
        setOpen(true);
    };

    const editSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Updating drink:', data);
        put(route('drinks.update', { id: editingDrink }), {
            onSuccess: () => setEditingDrink(null),
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this drink? 😢')) {
            destroy(route('drinks.destroy', id), {
                onSuccess: () => console.log('Drink deleted successfully'),
            });
        }
    };

    /**
     * Handles the form submission for creating a new drink.
     * Prevents the default form submission behavior and posts the form data to the specified Laravel route.
     * @param {React.FormEvent} e - The form submission event.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('drinks.store')); // Your Laravel route for handling drink submissions
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Drink" />
            <div className="flex h-1/2 flex-1 flex-col gap-4 rounded-xl p-4">
                {/* <div className="grid auto-rows-min gap-4">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <div className="p-6">
                            <Head title="Drinks List" />
                            <h1 className="mb-4 text-2xl font-bold">Drinks Menu 🧃</h1>

                            <div className="max-h-[400px] overflow-y-auto">
                                <table className="min-w-full border-collapse">
                                    <thead className="sticky top-0 bg-gray-100">
                                        <tr className="text-left">
                                            <th className="p-2">Name</th>
                                            <th className="p-2">Category</th>
                                            <th className="p-2">Price (RM)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {drinks.map((drink) => (
                                            <tr key={drink.id} className="border-t">
                                                <td className="p-2">{drink.name}</td>
                                                <td className="p-2">{drink.category}</td>
                                                <td className="p-2">{drink.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="p-6">
                    <h1 className="mb-4 text-2xl font-bold">Drinks Menu 🧃</h1>

                    <table className="min-w-full border">
                        <thead>
                            <tr>
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Category</th>
                                <th className="p-2 text-left">Price</th>
                                <th className="p-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drinks.map((drink) => (
                                <tr key={drink.id} className="border-t">
                                    <td className="p-2">{drink.name}</td>
                                    <td className="p-2">{drink.category}</td>
                                    <td className="p-2">{drink.price}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => startEdit(drink)}
                                            className="rounded-full p-2 text-blue-500 transition-colors hover:bg-blue-100"
                                        >
                                            <Pen size={18} strokeWidth={1.8} />
                                        </button>
                                        {/* Delete Dialog */}
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button
                                                    onClick={() => setDeleteDrink(drink.id)}
                                                    className="rounded-full p-2 text-red-500 transition-colors hover:bg-red-100"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} strokeWidth={1.8} />
                                                </button>
                                            </AlertDialogTrigger>

                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete this drink?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to delete <b>{drink.name}</b>? 😢 This action can’t be undone, baby.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>

                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className="bg-red-500 hover:bg-red-600"
                                                        onClick={() => {
                                                            destroy(route('drinks.destroy', deleteDrink), {
                                                                onSuccess: () => setDeleteDrink(null),
                                                            });
                                                        }}
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Edit Drink ✏️</DialogTitle>
                            <DialogDescription>Update your drink details and save your changes.</DialogDescription>
                        </DialogHeader>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                put(route('drinks.update', { id: editingDrink }), {
                                    onSuccess: () => {
                                        setOpen(false);
                                        setEditingDrink(null);
                                    },
                                });
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    className="w-full rounded border p-2"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Category</label>
                                <Select
                                    onValueChange={(value) => {
                                        console.log('Selected value:', value);
                                        console.log('Type of value:', typeof value);
                                        setData('category', value);
                                    }}
                                    value={data.category}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Coffee">Coffee</SelectItem>
                                        <SelectItem value="Soda">Soda</SelectItem>
                                        <SelectItem value="Matcha">Matcha</SelectItem>
                                        <SelectItem value="Chocolate">Chocolate</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Price (RM)</label>
                                <input
                                    type="text"
                                    className="w-full rounded border p-2"
                                    value={data.price}
                                    onChange={(e) => setData('price', Number(e.target.value))}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Description</label>
                                <textarea
                                    className="w-full rounded border p-2"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                            </div>

                            <DialogFooter className="mt-4">
                                <Button type="submit">Save changes</Button>
                                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6 p-4">
                        <h2 className="text-xl font-bold">Add New Item</h2>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Item Name</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="service">Category</Label>
                            <Select
                                onValueChange={(value) => {
                                    console.log('Selected value:', value);
                                    console.log('Type of value:', typeof value);
                                    setData('category', value);
                                }}
                                value={data.category}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Coffee">Coffee</SelectItem>
                                    <SelectItem value="Soda">Soda</SelectItem>
                                    <SelectItem value="Matcha">Matcha</SelectItem>
                                    <SelectItem value="Chocolate">Chocolate</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="price">Price (RM)</Label>
                            <div className="relative">
                                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 select-none">RM</span>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.10"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData('price', Number(e.target.value))}
                                    className="pl-10"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                        </div>

                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Adding...' : 'Add Item'}
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
