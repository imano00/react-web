import AddDrinkDialog from '@/components/custom-component/add-drink-dialog';
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
import { Badge } from '@/components/ui/badge';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { SelectGroup } from '@radix-ui/react-select';
import { CakeSlice, Coffee, CupSoda, Eye, Leaf, Pen, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

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
    const [filter, setFilter] = useState('All');

    const {
        data,
        setData,
        post,
        processing,
        reset,
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
        try {
            e.preventDefault();
            console.log('Updating drink:', data);
            put(route('drinks.update', { id: editingDrink }), {
                onSuccess: () => {
                    (setEditingDrink(null), toast.success('Edit saved successfully! 💛'), setOpen(false));
                },
            });
        } catch (e) {
            console.error('Error updating drink:', e);
        }
    };

    // const submitUpdate = async () => {
    //     await fetch(`/api/drinks/${editingDrink}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     });

    //     setOpen(false);
    // };

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

        post(route('drinks.store'), {
            onSuccess: () => {
                toast.success('New drink added! 🧋');
                setOpen(false); // close dialog
                reset(); // reset fields
            },
        });
    };

    const filteredDrinks = filter === 'All' ? drinks : drinks.filter((d) => d.category === filter);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Drink" />
            <Card className="border-muted mx-4 mb-4 border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-lg font-semibold">Drink List 🧋</CardTitle>

                    {/* ✨ Filter by Category */}
                    <Select value={filter} onValueChange={setFilter}>
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
                    </Select>

                    {/* ✨ Add New Drink Button */}
                    <AddDrinkDialog />
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
                            {filteredDrinks.map((drink) => (
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
                                                    <div className="my-2 mr-4 ml-2 flex items-center justify-between">
                                                        <DialogTitle className="text-foreground text-xl font-semibold">{drink.name}</DialogTitle>
                                                        <Card className="border-muted shadow-sm">
                                                            <CardContent className="flex items-center">
                                                                <p className="text-md px-2 font-medium capitalize">{drink.category}</p>
                                                                {(drink.category === 'coffee' || drink.category === 'Coffee') && (
                                                                    <Badge className="h-7 min-w-7 rounded-full">
                                                                        <Coffee size={20} />
                                                                    </Badge>
                                                                )}
                                                                {(drink.category === 'soda' || drink.category === 'Soda') && (
                                                                    <Badge className="h-7 min-w-7 rounded-full">
                                                                        <CupSoda size={20} className="text-sky-500" />
                                                                    </Badge>
                                                                )}
                                                                {(drink.category === 'matcha' || drink.category === 'Matcha') && (
                                                                    <Badge className="h-7 min-w-7 rounded-full">
                                                                        <Leaf size={20} className="text-green-600" />
                                                                    </Badge>
                                                                )}
                                                                {(drink.category === 'chocolate' || drink.category === 'Chocolate') && (
                                                                    <Badge className="h-7 min-w-7 rounded-full">
                                                                        <CakeSlice size={20} className="text-brown-700" />
                                                                    </Badge>
                                                                )}
                                                            </CardContent>
                                                        </Card>
                                                    </div>

                                                    <DialogDescription className="text-foreground text-xl font-semibold">
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
                                        {/* <button
                                            onClick={() => startEdit(drink)}
                                            className="rounded-full p-2 text-blue-500 transition-colors hover:bg-blue-100"
                                            title="Edit"
                                        >
                                            <Pen size={18} strokeWidth={1.8} />
                                        </button> */}

                                        <AlertDialog open={open} onOpenChange={setOpen}>
                                            <AlertDialogTrigger asChild>
                                                <button
                                                    onClick={() => startEdit(drink)}
                                                    className="rounded-full p-2 text-blue-500 transition-colors hover:bg-blue-100"
                                                    title="Edit"
                                                >
                                                    <Pen size={18} strokeWidth={1.8} />
                                                </button>
                                            </AlertDialogTrigger>

                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Edit Drink</AlertDialogTitle>
                                                </AlertDialogHeader>

                                                {/* ✏️ Edit Form */}
                                                <div className="mt-2 space-y-3">
                                                    <div>
                                                        <label className="text-sm">Name</label>
                                                        <input
                                                            value={data.name}
                                                            onChange={(e) => setData('name', e.target.value)}
                                                            className="w-full rounded-md border p-2"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="text-sm">Category</label>
                                                        <select
                                                            value={data.category}
                                                            onChange={(e) => setData('category', e.target.value)}
                                                            className="w-full rounded-md border p-2"
                                                        >
                                                            <option value="Coffee">Coffee</option>
                                                            <option value="Soda">Soda</option>
                                                            <option value="Chocolate">Chocolate</option>
                                                            <option value="Matcha">Matcha</option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="text-sm">Price (RM)</label>
                                                        <input
                                                            type="number"
                                                            value={data.price}
                                                            onChange={(e) => setData('price', Number(e.target.value))}
                                                            className="w-full rounded-md border p-2"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="text-sm">Description</label>
                                                        <textarea
                                                            value={data.description}
                                                            onChange={(e) => setData('description', e.target.value)}
                                                            className="w-full rounded-md border p-2"
                                                        />
                                                    </div>
                                                </div>

                                                <AlertDialogFooter className="mt-4">
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={editSubmit}>Save Changes</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

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
                                                            if (deleteDrink) {
                                                                destroy(route('drinks.destroy', deleteDrink), {
                                                                    onSuccess: () => setDeleteDrink(null),
                                                                });
                                                            }
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
