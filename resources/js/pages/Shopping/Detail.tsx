import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';

interface ProductImage {
    id: number;
    url: string;
    sort_order: number;
    is_primary: boolean;
}

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category_name?: string;
    description?: string;
    images: ProductImage[];
}

interface Props {
    product: Product;
}

export default function Detail({ product }: Props) {
    // 1. Extract URLs
    const images = product.images?.map((img) => img.url) || [];

    // 2. Initialize state directly with the first image URL if it exists
    // This ensures that on the VERY FIRST render, selectedImage isn't empty
    const [selectedImage, setSelectedImage] = useState(images[0] || '');

    // 3. Keep the useEffect ONLY for when the user navigates between different products
    useEffect(() => {
        if (images.length > 0) {
            setSelectedImage(images[0]);
        }
    }, [product.id]); // Triggered when the product ID changes

    console.log(product);
    return (
        <AppLayout>
            <div className="mx-auto max-w-7xl p-6">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                    {/* LEFT SIDE */}
                    <div className="flex gap-4">
                        {/* thumbnails */}
                        <div className="flex flex-col gap-3">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(img)}
                                    className={`overflow-hidden rounded-lg border ${selectedImage === img ? 'border-primary' : 'border-muted'}`}
                                >
                                    <img src={img || ''} className="h-24 w-24 object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* main image */}
                        <Card className="flex-1 overflow-hidden">
                            <img
                                // Use a hard fallback here just in case images[0] was undefined
                                src={selectedImage || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'}
                                className="h-full w-full object-cover"
                                alt={product.name}
                            />
                        </Card>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-muted-foreground text-sm uppercase">{product.category_name}</p>

                            <h1 className="text-4xl font-bold">{product.name}</h1>
                        </div>

                        <div className="text-3xl font-semibold">RM {product.price}</div>

                        <div>
                            {product.stock > 0 ? (
                                <span className="text-green-600">{product.stock} in stock</span>
                            ) : (
                                <span className="text-red-500">Sold Out</span>
                            )}
                        </div>

                        <div className="text-muted-foreground leading-7">{product.description || 'No description available.'}</div>

                        <Button size="lg" className="w-full" disabled={product.stock <= 0}>
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
