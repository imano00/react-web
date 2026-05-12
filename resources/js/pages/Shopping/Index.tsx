// pages/products/index.tsx

import ProductGrid from '@/components/custom-component/Product/product-grid';
import ProductList from '@/components/custom-component/Product/product-list';
import SearchBar from '@/components/custom-component/search-bar';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Product } from '@/types/Product';
import { useEffect, useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Shopping',
        href: '/shopping',
    },
];
export default function ProductPage() {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [search, setSearch] = useState('');

    // Data states
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch products on mount
    const fetchProducts = async () => {
        try {
            setLoading(true);

            const response = await fetch(`/customer/products?search=${search}`);

            const data = await response.json();

            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);
    // Filtered products
    const filteredProducts = useMemo(() => {
        return products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }, [products, search]);

    // Add to cart handler (you’ll expand this later)
    const handleAdd = (product: Product) => {
        console.log('Added:', product);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-4 p-4">
                {/* Top Bar */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    {/* Search */}
                    <div className="w-full md:w-1/2">
                        <SearchBar value={search} onChange={setSearch} />
                    </div>

                    {/* View Toggle */}
                    <div className="flex gap-2">
                        <Button variant={view === 'grid' ? 'default' : 'outline'} onClick={() => setView('grid')}>
                            Grid
                        </Button>

                        <Button variant={view === 'list' ? 'default' : 'outline'} onClick={() => setView('list')}>
                            List
                        </Button>
                    </div>
                </div>

                {/* Product Display */}

                <div>
                    {loading ? (
                        <div className="py-10 text-center">Loading products...</div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-muted-foreground py-10 text-center">No products found…</div>
                    ) : view === 'grid' ? (
                        <ProductGrid products={filteredProducts} onAdd={handleAdd} />
                    ) : (
                        <ProductList products={filteredProducts} onAdd={handleAdd} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
