import AddDrinkDialog from '@/components/custom-component/add-drink-dialog';
import DetailCard from '@/components/custom-component/detail-card';
import { DrinkForm } from '@/components/custom-component/drink-form';
import EditDialog from '@/components/custom-component/edit-dialog';
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

interface Drink {
    id: number;
    name: string;
    subcategory_id: number;
    subcategory: Subcategory;
    subcategories: Subcategory[];
    category: Category;
    price: number;
    description?: string;
}

export default function Index({ drinks, categories }: { drinks: Drink[]; categories: Category[] }) {
    const [editingDrink, setEditingDrink] = useState<null | number>(null);
    const [deleteDrink, setDeleteDrink] = useState<null | number>(null);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState(''); // Define categories here
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
        subcategory_id: 0,
        price: 0,
        description: '',
    });

    const startEdit = (drink: Drink) => {
        setEditingDrink(drink.id);
        setData({
            name: drink.name,
            subcategory_id: drink.subcategory_id,
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

    // Filter drinks based on search and category
    const filteredDrinks = drinks.filter((drink) => {
        const matchesSearch = drink.name.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = category === 'All' || drink.subcategory?.id === Number(category);

        return matchesSearch && matchesCategory;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Drink" />
            <Card className="border-muted mx-4 mb-4 border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-around">
                    <CardTitle className="w-full text-lg font-semibold">Drink List 🧋</CardTitle>
                    {/* ✨ Filter by Subcategory (under Drinks) */}
                    {/* <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="All">All</SelectItem>
                                {categories
                                    .find((c) => c.name === 'Drinks')
                                    ?.subcategories.map((sub) => (
                                        <SelectItem key={sub.id} value={sub.name}>
                                            {sub.name.charAt(0).toUpperCase() + sub.name.slice(1)}
                                        </SelectItem>
                                    ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select> */}

                    {/* ✨ Filter by Subcategory (under Drinks) */}
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="All">All</SelectItem>
                                {categories
                                    .find((c) => c.name === 'Drinks')
                                    ?.subcategories.map((sub) => (
                                        <SelectItem key={sub.id} value={sub.id.toString()}>
                                            {sub.name.charAt(0).toUpperCase() + sub.name.slice(1)}
                                        </SelectItem>
                                    ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <SearchBar value={search} onChange={setSearch} placeholder="Search drinks" className="mx-2 w-full" />

                    {/* ✨ Add New Drink Button */}
                    <AddDrinkDialog categories={categories} />
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
                                    <TableCell>
                                        {drink.subcategory?.name
                                            ? drink.subcategory.name.charAt(0).toUpperCase() + drink.subcategory.name.slice(1)
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>{Number(drink.price).toFixed(2)}</TableCell>
                                    <TableCell className="space-x-1 text-center">
                                        {/* ✨ View Details Button */}
                                        <DetailCard {...drink} />

                                        {/* ✨ Edit Drink Button */}
                                        <EditDialog
                                            title="Edit Drink🍹"
                                            onSubmit={editSubmit}
                                            trigger={
                                                <Button onClick={() => startEdit(drink)} className="rounded-full p-2 text-blue-500 hover:bg-blue-100">
                                                    <Pen size={18} />
                                                </Button>
                                            }
                                            children={
                                                // <EditForm data={data} setData={setData} categories={categories} showDescription={showDescription} />
                                                <DrinkForm data={data} setData={setData} categories={categories} mode="edit" />
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
