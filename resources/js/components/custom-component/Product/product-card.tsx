// components/product-card.tsx

import { Card } from '@/components/ui/card';
import { Product } from '@/types/Product';
import { router } from '@inertiajs/react';

type Props = {
    product: Product;
    onAdd: (product: Product) => void;
};

export default function ProductCard({ product, onAdd }: Props) {
    return (
        <Card
            // onClick={() => product.stock > 0 && onAdd(product)}
            onClick={() => router.visit(`/customer/product/${product.id}`)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl p-3 transition-all duration-200 hover:shadow-xl active:scale-95"
        >
            {/* Image */}
            <div className="mb-3 aspect-square overflow-hidden rounded-xl bg-gray-100">
                {product.image_url ? (
                    <img src={product.image_url} className="h-full w-full object-cover transition group-hover:scale-105" />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">No Image</div>
                )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1">
                <span className="line-clamp-2 text-sm font-semibold">{product.name}</span>

                {product.category_name && <span className="text-muted-foreground text-xs">{product.category_name}</span>}
            </div>

            {/* Footer */}
            <div className="mt-2 flex items-center justify-between">
                <span className="text-base font-bold">RM {product.price.toFixed(2)}</span>

                <span className={`rounded-full px-2 py-1 text-xs ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {product.stock > 0 ? 'In stock' : 'Out'}
                </span>
            </div>

            {/* Subtle Add Hint */}
            {product.stock > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/5">
                    <span className="rounded-full bg-white px-3 py-1 text-xs opacity-0 shadow group-hover:opacity-100">Tap to add</span>
                </div>
            )}
        </Card>
    );
}
