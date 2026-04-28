// types/product.ts

export type Product = {
  id: number;
  name: string;
  sku?: string;
  barcode?: string;

  price: number;
  cost?: number;

  stock: number;

  category_id?: number;
  category_name?: string;

  image_url?: string;
  description?: string;

  is_active: boolean;

  created_at?: string;
  updated_at?: string;
};