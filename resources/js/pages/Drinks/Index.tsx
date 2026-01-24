import AddDrinkDialog from '@/components/custom-component/add-drink-dialog';
import DetailCard from '@/components/custom-component/detail-card';
import EditDialog from '@/components/custom-component/edit-dialog';
import EditForm from '@/components/custom-component/edit-form';
import SearchBar from '@/components/custom-component/search-bar';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { SelectGroup } from '@radix-ui/react-select';
import { Pen, Trash2 } from 'lucide-react';
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
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [categories] = useState<string[]>([]); // Define categories here
    const [showDescription] = useState(true);

    const {
        data,
        setData,
        post,
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

    // Filter drinks based on search and category
    const filteredDrinks = drinks.filter((drink) => {
        const matchesSearch = drink.name.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = category === 'All' || drink.category === category;

        return matchesSearch && matchesCategory;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Drink" />
            <Card className="border-muted mx-4 mb-4 border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-around">
                    <CardTitle className="w-full text-lg font-semibold">Drink List 🧋</CardTitle>
                    {/* ✨ Filter by Category */}
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
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
                    <SearchBar value={search} onChange={setSearch} placeholder="Search drinks" className="mx-2 w-full" />

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
                                        <DetailCard {...drink} />

                                        {/* ✨ Edit Drink Button */}
                                        <EditDialog
                                            open={open}
                                            setOpen={setOpen}
                                            title="Edit Drink🍹"
                                            onSubmit={editSubmit}
                                            trigger={
                                                <Button onClick={() => startEdit(drink)} className="rounded-full p-2 text-blue-500 hover:bg-blue-100">
                                                    <Pen size={18} />
                                                </Button>
                                            }
                                            children={
                                                <EditForm data={data} setData={setData} categories={categories} showDescription={showDescription} />
                                            }
                                        />

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
