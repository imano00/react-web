// components/product-grid.tsx

import { Product } from '@/types/Product';
import ProductCard from './product-card';

type Props = {
    products: Product[];
    onAdd: (product: Product) => void;
};

export default function ProductGrid({ products, onAdd }: Props) {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={onAdd} />
            ))}
        </div>
    );
}
