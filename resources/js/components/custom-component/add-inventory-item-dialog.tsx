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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Textarea } from '../textarea';
import { Button } from '../ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';

interface Category {
    id: number;
    name: string;
    subcategories: { id: number; name: string }[];
}

interface AddInventoryItemDialogProps {
    categories: Category[];
    open: boolean;
    onOpenChange?: (open: boolean) => void;
}
export default function AddInventoryItemDialog({ categories = [], open, onOpenChange }: AddInventoryItemDialogProps) {
    const { data, setData, post, reset, processing, errors } = useForm({
        name: '',
        subcategory_id: '',
        unit: '',
        current_stock: 0,
        reorder_level: 0,
        description: '',
    });

    const [name, setName] = useState('');
    const [subcategoryId, setSubcategoryId] = useState<number | null>(null);
    const [unit, setUnit] = useState('');
    const [currentStock, setCurrentStock] = useState(0);
    const [reorderLevel, setReorderLevel] = useState(0);
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [openDialog, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('inventory-items.store'), {
            onSuccess: () => {
                toast.success('New inventory item added!');
                setOpen(false);
                reset();
                setSelectedCategory(null);
            },
        });
    };

    const filteredSubcategories = selectedCategory ? (categories.find((cat) => cat.id === selectedCategory)?.subcategories ?? []) : [];

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button>+ Add New Item</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add New Inventory Item</AlertDialogTitle>
                        <AlertDialogDescription>Add a new inventory item to your stock.</AlertDialogDescription>
                    </AlertDialogHeader>

                    <FieldGroup>
                        <FieldSet>
                            <Field className="mt-4">
                                <FieldLabel htmlFor="name">Item Name</FieldLabel>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="category">Category</FieldLabel>
                                {/* Category Select */}
                                <Select
                                    value={selectedCategory?.toString() ?? ''}
                                    onValueChange={(val) => {
                                        const catId = Number(val) || null;
                                        setSelectedCategory(catId);
                                        setData('subcategory_id', ''); // Reset subcategory when category changes
                                    }}
                                >
                                    <SelectTrigger className="w-full rounded border p-2">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Subcategory Select */}
                                <Select
                                    value={data.subcategory_id?.toString() ?? ''}
                                    onValueChange={(val) => setData('subcategory_id', val)}
                                    disabled={!selectedCategory}
                                >
                                    <SelectTrigger className="w-full rounded border p-2">
                                        <SelectValue placeholder="Select Subcategory" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filteredSubcategories?.map((sub) => (
                                            <SelectItem key={sub.id} value={sub.id.toString()}>
                                                {sub.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field className="mt-4">
                                <FieldLabel htmlFor="unit">Unit</FieldLabel>
                                <Input id="unit" value={data.unit} onChange={(e) => setData('unit', e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="current_stock">Current Stock</FieldLabel>
                                <Input
                                    id="current_stock"
                                    type="number"
                                    step="1.00"
                                    value={data.current_stock}
                                    onChange={(e) => setData('current_stock', Number(e.target.value))}
                                    className="w-full rounded-md border p-2"
                                ></Input>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="reorder_level">Reorder Level</FieldLabel>
                                <Input
                                    id="reorder_level"
                                    type="number"
                                    step="1.00"
                                    value={data.reorder_level}
                                    onChange={(e) => setData('reorder_level', Number(e.target.value))}
                                    className="w-full rounded-md border p-2"
                                ></Input>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="description">Description</FieldLabel>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full rounded-md border p-2"
                                ></Textarea>
                            </Field>
                        </FieldSet>
                    </FieldGroup>
                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit">Add Item</AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
