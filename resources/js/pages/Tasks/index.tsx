import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"></div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <form className="w-full max-w-md space-y-6 p-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Your Name</Label>
                            <Input type="text" id="name" placeholder="Enter your sexy name" />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="Enter your hot inbox" />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" placeholder="Keep it a naughty secret" />
                        </div>

                        <Button type="submit" className="w-full">
                            Submit Me 😈
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
