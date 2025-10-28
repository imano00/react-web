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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Eye, Pen, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Drinks',
        href: '/index',
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
            <Card className="border-muted mx-4 mb-4 border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Create New Drink 🧋</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] w-full flex-1 overflow-hidden rounded-xl border md:min-h-min">
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
                </CardContent>
            </Card>
            <Card className="border-muted mx-4 mb-4 border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Drink List 🧋</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-left">Price (RM)</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {drinks.map((drink) => (
                                <TableRow key={drink.id}>
                                    <TableCell>{drink.id}</TableCell>
                                    <TableCell>{drink.name}</TableCell>
                                    <TableCell>{drink.category}</TableCell>
                                    <TableCell>{Number(drink.price).toFixed(2)}</TableCell>
                                    <TableCell className="space-x-1 text-center">
                                        {/* ✨ View Details Button */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button
                                                    className="rounded-full p-2 text-purple-500 transition-colors hover:bg-purple-100"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} strokeWidth={1.8} />
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-md">
                                                <DialogHeader>
                                                    <DialogTitle className="text-foreground text-xl font-semibold">{drink.name}</DialogTitle>
                                                    <DialogDescription className="text-foreground text-xl font-semibold">
                                                        <p>
                                                            <strong className="text-foreground text-xl font-semibold">Category:</strong>{' '}
                                                            {drink.category}
                                                        </p>
                                                        {/* <Card className="border-muted flex items-center shadow-sm">
                                                            <div>
                                                                <p className="text-muted-foreground text-sm">Category</p>
                                                                <p className="text-lg font-medium capitalize">
                                                                    {drink.category}
                                                                    <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
                                                                        {(drink.category === 'coffee' || drink.category === 'Coffee') && (
                                                                            <Coffee size={20} className="text-amber-700" />
                                                                        )}
                                                                        {(drink.category === 'soda' || drink.category === 'Soda') && (
                                                                            <CupSoda size={20} className="text-sky-500" />
                                                                        )}
                                                                        {(drink.category === 'matcha' || drink.category === 'Matcha') && (
                                                                            <Leaf size={20} className="text-green-600" />
                                                                        )}
                                                                        {(drink.category === 'chocolate' || drink.category === 'Chocolate') && (
                                                                            <CakeSlice size={20} className="text-brown-700" />
                                                                        )}
                                                                    </div>
                                                                </p>
                                                            </div>
                                                        </Card> */}
                                                        <p>
                                                            <strong className="text-foreground text-xl font-semibold">Price:</strong> RM{' '}
                                                            {Number(drink.price).toFixed(2)}
                                                        </p>
                                                        <Separator className="my-2" />
                                                        <p className="text-muted-foreground">
                                                            <strong className="text-foreground text-xl font-semibold">Description:</strong>{' '}
                                                            {drink.description || 'No description provided.'}
                                                        </p>
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline" className="w-full px-4 py-2 text-base sm:w-auto">
                                                            Close
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                        {/* ✏️ Edit Button */}
                                        <button
                                            onClick={() => startEdit(drink)}
                                            className="rounded-full p-2 text-blue-500 transition-colors hover:bg-blue-100"
                                            title="Edit"
                                        >
                                            <Pen size={18} strokeWidth={1.8} />
                                        </button>

                                        {/* 🗑️ Delete Button */}
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
                                                        Are you sure you want to delete <b>{drink.name}</b>? 😢 This action can’t be undone,
                                                        sweetheart.
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
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
