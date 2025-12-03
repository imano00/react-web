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

export default function AddDrinkDialog() {
    const [open, setOpen] = useState(false);

    const { data, setData, post, reset } = useForm({
        name: '',
        category: '',
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
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button>+ Add New Drink</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Create New Drink 🧋</AlertDialogTitle>
                        <AlertDialogDescription>Add a new drink item to your menu.</AlertDialogDescription>
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
                                            <SelectItem value="Coffee">Coffee</SelectItem>
                                            <SelectItem value="Soda">Soda</SelectItem>
                                            <SelectItem value="Chocolate">Chocolate</SelectItem>
                                            <SelectItem value="Matcha">Matcha</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="price">Price (RM)</FieldLabel>
                                <Input
                                    id="price"
                                    type="number"
                                    step="1.00"
                                    value={data.price}
                                    onChange={(e) => setData('price', Number(e.target.value))}
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
