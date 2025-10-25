import { Textarea } from '@/components/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Index() {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        category: '',
        price: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('drinks.store')); // Your Laravel route for handling drink submissions
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Drink" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"
                        >
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    ))}
                </div>

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
                                    onChange={(e) => setData('price', e.target.value)}
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
