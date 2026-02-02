export type InventoryItem = {
  id: number;
  name: string;
  subcategory_id: number;
  unit: string;
  current_stock: number;       
  reorder_level: number;
  description: string | null;
};
