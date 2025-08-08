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
        customer: '',
        phone: '',
        address: '',
        problem: '',
        service: '',
        price: '',
        technician: '',
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/orders'); // Your Laravel route for handling order submissions
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Order" />
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
                    <form onSubmit={submit} className="w-full max-w-2xl space-y-6 p-4">
                        <h2 className="text-xl font-bold">Create New Service Order</h2>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="customer">Customer Name</Label>
                            <Input id="customer" value={data.customer} onChange={(e) => setData('customer', e.target.value)} />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="problem">Problem Description</Label>
                            <Textarea id="problem" value={data.problem} onChange={(e) => setData('problem', e.target.value)} />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="service">Service Type</Label>
                            <Select onValueChange={(value) => setData('service', value)} value={data.service}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select service type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Installation">Installation</SelectItem>
                                    <SelectItem value="Servicing">Servicing</SelectItem>
                                    <SelectItem value="Repair">Repair</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="price">Quoted Price (RM)</Label>
                            <Input type="number" id="price" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="technician">Assigned Technician</Label>
                            <Input id="technician" value={data.technician} onChange={(e) => setData('technician', e.target.value)} />
                            {/* Replace with a dropdown if you have tech list from backend */}
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="notes">Admin Notes</Label>
                            <Textarea id="notes" value={data.notes} onChange={(e) => setData('notes', e.target.value)} />
                        </div>

                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Submitting...' : 'Submit Order'}
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
