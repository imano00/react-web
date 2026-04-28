// pages/products/index.tsx

import ProductGrid from '@/components/custom-component/product-grid';
import ProductList from '@/components/custom-component/product-list';
import SearchBar from '@/components/custom-component/search-bar';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/Product';
import { useMemo, useState } from 'react';

export default function ProductPage() {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [search, setSearch] = useState('');

    // Dummy data (replace with API later)
    const [products] = useState<Product[]>([
        {
            id: 1,
            name: 'Caramel Latte',
            price: 12.5,
            stock: 10,
            category_name: 'Beverage',
            image_url: 'https://source.unsplash.com/300x300/?coffee',
            is_active: true,
        },
        {
            id: 2,
            name: 'Chocolate Muffin',
            price: 8.0,
            stock: 0,
            category_name: 'Bakery',
            image_url: 'https://source.unsplash.com/300x300/?muffin',
            is_active: true,
        },
    ]);

    // Filtered products
    const filteredProducts = useMemo(() => {
        return products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }, [products, search]);

    // Add to cart handler (you’ll expand this later)
    const handleAdd = (product: Product) => {
        console.log('Added:', product);
    };

    return (
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
                {filteredProducts.length === 0 ? (
                    <div className="text-muted-foreground py-10 text-center">No products found…</div>
                ) : view === 'grid' ? (
                    <ProductGrid products={filteredProducts} onAdd={handleAdd} />
                ) : (
                    <ProductList products={filteredProducts} onAdd={handleAdd} />
                )}
            </div>
        </div>
    );
}
