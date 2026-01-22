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
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '../textarea';
import { Button } from '../ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';

export default function AddInventoryItemDialog() {
    const [open, setOpen] = useState(false);

    const { data, setData, post, reset } = useForm({
        name: '',
        category: '',
        unit: '',
        current_stock: 0,
        reorder_level: 0,
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('inventory-items.store'), {
            onSuccess: () => {
                toast.success('New inventory item added!');
                setOpen(false); // close dialog
                reset(); // clear form
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button>+ Add New Drink</Button>
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
                                <Select value={data.category} onValueChange={(v) => setData('category', v)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Raw Ingredient">Coffee</SelectItem>
                                            <SelectItem value="Material">Material</SelectItem>
                                            <SelectItem value="Packaging">Packaging</SelectItem>
                                            <SelectItem value="Others">Others</SelectItem>
                                        </SelectGroup>
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
