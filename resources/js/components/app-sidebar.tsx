import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, BriefcaseBusinessIcon, Folder, LayoutGrid, Moon, Sun, CupSoda, BadgeDollarSign } from 'lucide-react';
import { HTMLAttributes } from 'react';
import AppLogo from './app-logo';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Drinks',
        href: '/drinks',
        icon: CupSoda,
    },
    {
        title: 'Sales',
        href: '/sales/create',
        icon: BadgeDollarSign,
    },
    {
        title: 'Sales History',
        href: '/sales/show',
        icon: BriefcaseBusinessIcon,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();
    const value = appearance === 'dark' ? 'dark' : 'light';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <div className="flex items-center justify-between px-4 py-2">
                    <Label htmlFor="appearance-mode" className="flex items-center gap-2 text-sm font-medium">
                        <span>Mode</span>
                        <AnimatePresence mode="wait">
                            {appearance === 'dark' ? (
                                <motion.div
                                    key="moon"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 180 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Moon className="h-4 w-4" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="sun"
                                    initial={{ opacity: 0, rotate: 90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: -180 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Sun className="h-4 w-4" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Label>
                    <Switch
                        id="appearance-mode"
                        onCheckedChange={() => updateAppearance(appearance === 'dark' ? 'light' : 'dark')}
                        className={cn(
                            appearance === value
                                ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                                : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                        )}
                    />
                </div>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
