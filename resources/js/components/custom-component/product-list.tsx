// components/product-list.tsx

import { Product } from '@/types/Product';

type Props = {
    products: Product[];
    onAdd: (product: Product) => void;
};

export default function ProductList({ products, onAdd }: Props) {
    return (
        <div className="flex flex-col divide-y">
            {products.map((product) => (
                <div
                    key={product.id}
                    onClick={() => product.stock > 0 && onAdd(product)}
                    className="hover:bg-muted flex cursor-pointer items-center gap-4 p-3 transition"
                >
                    {/* Image */}
                    <div className="h-14 w-14 overflow-hidden rounded-lg bg-gray-100">
                        {product.image_url && <img src={product.image_url} className="h-full w-full object-cover" />}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-muted-foreground text-xs">{product.category_name}</div>
                    </div>

                    {/* Price */}
                    <div className="font-semibold">RM {product.price.toFixed(2)}</div>
                </div>
            ))}
        </div>
    );
}
